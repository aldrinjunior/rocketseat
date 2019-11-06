import express from 'express';
import path from 'path';
import routes from './routes';

import './database';

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes(); 
    }

    middlewares(){
        this.server.use(express.json()); //fazer essa rota para o front end acessar a imagem do usuario
        this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));
    }
    routes() {
        this.server.use(routes);
    }
}   
export default new App().server; //exportando uma instancia de app