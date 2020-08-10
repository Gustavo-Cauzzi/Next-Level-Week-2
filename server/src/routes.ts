import express from 'express';
import ClassesController from './controllers/ClassesControllers';
import ConnectionsControllers from './controllers/ConnectionsControllers';

const routes = express.Router();
const classesControllers = new ClassesController();
const connectiosControllers = new ConnectionsControllers();

routes.get('/classes',classesControllers.index);
routes.post('/classes',classesControllers.create);

routes.get('/connections',connectiosControllers.index);
routes.post('/connections',connectiosControllers.create)

export default routes;