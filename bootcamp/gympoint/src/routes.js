import { Router }  from 'express';

import StudentsController from './app/controller/StudentsController';
import SessionController from './app/controller/SessionController';

const routes = new Router();

routes.post('/student', StudentsController.store); 
routes.post('/sessions', SessionController.store);
//evitar que essa rota update seja acessada quando o usuario não estiver logado na aplicação 
routes.put('/students', StudentsController.update);

export default routes;