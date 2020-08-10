import React , { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from "../../assets/images/icons/warning.svg"

import api from '../../services/api';
import './styles.css';



export default function TeacherForm(){
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0,from: '', to: '' }
  ]);//Ver comentário 1

  function addNewScheduleItem(){
    setScheduleItems([ 
      ...scheduleItems,
      { week_day: 0,from: '', to: '' }
    ]);    
  } //Ver comentário 2

  function handleSubmitClass(e: FormEvent){
    e.preventDefault();

    api.post('classes',{
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastro Realizado Com Sucesso!!!');

      history.push('/');
    }).catch(() => {
      alert('Erro catastrófico! Acionar o suporte! (handleSubmitScheduleItem)');
    })

    console.log({
      name,avatar,whatsapp,bio,subject,cost:Number,scheduleItems
    })
  }

  function setScheduleItemValue(position: number, field: string, value: string){
    const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if(index === position){
        return {...scheduleItem, [field]: value};
      }

      return scheduleItem;
    });
    
    setScheduleItems(updateScheduleItems);
  }

  return (
    <div id="page-teacher-form" className="container">
        <PageHeader 
            title="Que incrivel que você quer dar aulas"
            description="O primeiro passo é preencher este formulário">
        </PageHeader>
      <main>
        <form onSubmit={handleSubmitClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input 
              name="name" 
              label="Nome Completo" 
              value={name} 
              onChange={ (e) => { setName(e.target.value) }} 
            />
            <Input 
              name="avatar" 
              label="Avatar" 
              value={avatar} 
              onChange={ (e) => { setAvatar(e.target.value) }} 
            />
            <Input 
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp} 
              onChange={ (e) => { setWhatsapp(e.target.value) }} 
            />
            <Textarea 
              name="bio" 
              label="Biografia"
              value={bio} 
              onChange={ (e) => { setBio(e.target.value) }} 
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select name="subject" label="Matéria"
              value={subject}
              onChange={(e) => {setSubject(e.target.value)}}
              options={[
                  { value: 'Ciências', label: 'Ciências'},
                  { value: 'Português', label: 'Português'},
                  { value: 'Matemática', label: 'Matemática'},
                  { value: 'Filosofia', label: 'Filosofia'},
                  { value: 'História', label: 'História'},
                  { value: 'Biologia', label: 'Biologia'},
                  { value: 'Geografia', label: 'Geografia'},
                  { value: 'Química', label: 'Química'},
                  { value: 'Educação Física', label: 'Educação Física'},
              ]}
            />
            <Input 
              name="cost" 
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(e) => {setCost(e.target.value)}}
            />
          </fieldset>
          <fieldset>
            <legend>Horários disponíveis
                <button type="button" onClick={addNewScheduleItem}>
                    +Novo horário
                </button>
            </legend>                   
            {scheduleItems.map((schedule_item, index) => {
                return(
                  <div key={ schedule_item.week_day } className="schedule-item">
                      <Select name="subject" label="Matéria"
                      value={schedule_item.week_day}
                      onChange={(e) => setScheduleItemValue(index,'week_day',e.target.value)}
                        options={[
                          { value: '0', label: 'Domingo'},
                          { value: '1', label: 'Segunda-feira'},
                          { value: '2', label: 'Terça-feira'},
                          { value: '3', label: 'Quarta-feira'},
                          { value: '4', label: 'Quinta-feira'},
                          { value: '5', label: 'Sexta-feira'},
                          { value: '6', label: 'Sábado'},
                        ]}
                      />
                      <Input 
                        name="from" 
                        label="Das" 
                        type="time"
                        value={schedule_item.from}
                        onChange={(e) => setScheduleItemValue(index,'from',e.target.value)}
                        
                        />
                      <Input 
                        name="to" 
                        label="Até" 
                        type="time"
                        value={schedule_item.to}
                        onChange={(e) => setScheduleItemValue(index,'to',e.target.value)}
                      />
                  </div>     
                )
            })}
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso Importante"/>
              Importante! <br />
              Preencha todos os dados!
            </p>
            <button type="submit">
              Salvar cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>
  )
}

/*
  - useState = Provém do react, é utilizado para podermos 
  atulizar o valor de uma variável. Este consiste de uma array
  de lenght 2, onde o primeiro valor é o valor que passamos
  e o segundo é uma função para podermos operá-lo.

  1 - const [schedule_items, setScheduleItems] = useState(...) -
  O que foi feito neste passo foi desconstruir os dois índices
  do useState em dois, um no qual é para referênciar o valor
  que colocamos e o outro a função.

  2 - setScheduleItems([ 
    ...schedule_items,
     { week_day: 0, from: '', to: '' }]);  -
  
    O que estamos fazendo é chamar a função para trocarmos o
    valor do estado de "scheduleItems", porém não queremos
    perder p que já esta, por isso usamos o "...schedule_items",
    para pegarmos todos os contúdos que possui antes e apenas
    adicionarmos um novo objeto após eles.

  
*/