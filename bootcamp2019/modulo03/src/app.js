import 'dotenv/config';

import express from 'express';
import path from 'path';
import Youch from 'youch';
import * as Sentry from '@sentry/node'; //criar também um arquivo sentry.js nas config
import 'express-async-errors';
import routes from './routes';
import sentryConfig from './config/sentry';

import './database';

class App {
    constructor() {
        this.server = express();

        Sentry.init(sentryConfig);

        this.middlewares();
        this.routes(); 
        this.exceptionHandler();
    }

    middlewares(){
        this.server.use(Sentry.Handlers.requestHandler());//adicionar o sentry antes de todas as chamadas de middlewares
        this.server.use(express.json()); //fazer essa rota para o front end acessar a imagem do usuario
        this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));
    }
    routes() {
        this.server.use(routes);
        this.server.use(Sentry.Handlers.errorHandler());//utilizar esse depois de todas as rotas para informar o error
    }

    exceptionHandler() {   //ao inves de receber req, res, ou next, precisa receber primeiro o err
        this.server.use(async (err, req, res, next ) => { //quando passa os 4 parametros, o express entende como um middleware de tratamento de erro
            //vai retornar o erro apenas se tiver em modo de desenvolvimento 
            if (process.env.NODE_ENV === 'development') {
            const errors = await new Youch(err, req).toJSON(); 
            //youch serve para mostrar um relatorio de erros, ele pode ser tambem um .toHTML, mas como aqui é uma api vamos usar JSON
            return res.status(500).json(errors);
            }
            return res.status(500).json({ error: 'Internal server error'});
        });                                            
    }
}   
export default new App().server; //exportando uma instancia de app