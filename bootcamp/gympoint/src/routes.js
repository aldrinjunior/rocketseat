import { Router }  from 'express';

import StudentsController from './app/controller/StudentsController';
import SessionController from './app/controller/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/student', StudentsController.store); 
routes.post('/sessions', SessionController.store);
//evitar que essa rota update seja acessada quando o usuario não estiver logado na aplicação 
routes.use(authMiddleware);
//vai passar pelo middleware somente quando for fazer a rota update
routes.put('/students', StudentsController.update);

export default routes;