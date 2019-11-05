import { Router }  from 'express';

import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store); 
routes.post('/sessions', SessionController.store);
//evitar que essa rota update seja acessada quando o usuario não estiver logado na aplicação 
//middleware global, só vai servir para as rotas de update do usuario
routes.use(authMiddleware);
routes.put('/users', UserController.update);//middleware local tem que inserir authMiddlewares com virgual anes do userController

export default routes;