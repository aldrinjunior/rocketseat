//essa index.js serve para criar um loader das classes que é responsável pela conexão com o bancode de dados
import Sequelize from 'sequelize';

import User from '../app/models/User';
import Students from '../app/models/Students';

import databaseConfig from '../config/database';

const models = [User, Students];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models.map(model => model.init(this.connection));
    }
}

export default new Database; //sempre exportar o metodo principal criado na class 