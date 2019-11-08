import { Router }  from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';
import FileController from './app/controller/FileController';
import ProviderController from './app/controller/ProviderController';
import AppointmentController from './app/controller/AppointmentController';
import ScheduleController from './app/controller/ScheduleController';
import NotificationController from './app/controller/NotificationController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store); 
routes.post('/sessions', SessionController.store);
//evitar que essa rota update seja acessada quando o usuario não estiver logado na aplicação 
//middleware global, só vai servir para as rotas de update do usuario
routes.use(authMiddleware);
routes.put('/users', UserController.update);//middleware local tem que inserir authMiddlewares com virgual anes do userController

routes.get('/providers', ProviderController.index);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedule', ScheduleController.index);//para importar os agendamentos diarios que o administrador vai ver 

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);//rota para marcar a notificação como lida

routes.post('/files', upload.single('file'), FileController.store);//vai fazer upload de apenas um arquivo e dps retornar um true no insominia
//precisa salvar essas informacoes do files dentro de algum controller (FileController.js)

export default routes;