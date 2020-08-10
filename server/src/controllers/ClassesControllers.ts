import {Request, Response} from 'express';
import db from '../database/connection';
import convertHourToMinute from '../utils/convertHourToMinutes';

interface ScheduleItem{
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController{
    async index(req : Request, res : Response){ // Index nesse caso normalmente se refere a uma lista
        const filters = req.query;
        
        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if(!filters.week_day || !filters.subject || !filters.time){
            return res.status(400).json({
                error:'Missing filter to search'
            })
        }
        const timeInMinutes =  convertHourToMinute(time);

        const classes = await db('classes')
            .whereExists(function(){
                this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id`=`classes`.`id`') //Para o whereRaw (que é um where sem a ajuda do express) temos que usar aspas simples e crases como o exemplo a seguir. (O whereRaw é recomendado para o usa dentro de um whereExists)
                .whereRaw('`class_schedule`.`week_day` = ??',[Number(week_day)])
                .whereRaw('`class_schedule`.`from` <= ??',[timeInMinutes])
                .whereRaw('`class_schedule`.`to` > ??',[timeInMinutes]);
            })
            .where('classes.subject', '=' , subject)
            .join('users', 'classes.user_id', '=','users.id')
            .select(['classes.*','users.*']);

        return res.json(classes);
    }
    async create(req : Request, res : Response){ //Necessário espessificar o tipo pois não temos todo o express aqui, então temos que importar a class 'Request' e 'Response' do express
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = req.body;
    
        const trx = await db.transaction(); //Para primeiro ver se as alterações são possíveis, e após isso, no .commit() la em baixo ele aí sim mandar (caso de erro, nada será feito)
        
        try{
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });
        
            const user_id = insertedUsersIds[0];
        
            const insertedClassesId = await trx('classes').insert({
                subject,
                cost,
                user_id,
            });
        
            const class_id = insertedClassesId[0];
            
            const classSchedule = schedule.map((scheduleItem : ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinute(scheduleItem.from),
                    to: convertHourToMinute(scheduleItem.to),
                };
            });
        
            await trx('class_schedule').insert(classSchedule);
            await trx.commit();
            
            return res.status(201).send();
        }catch (err){
            await trx.rollback();
            return res.status(400).json({
                error: 'Unexpected error while creating new class'
            });
        }
    }
}