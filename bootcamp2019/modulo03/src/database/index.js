//essa index.js serve para criar um loader das classes que é responsável pela conexão com o bancode de dados
import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

import databaseConfig from '../config/database';

const models = [User, File, Appointment];

class Database {
    constructor() {
        this.init();
        this.mongo();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
        .map(model => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models));
    }

    mongo(){
        this.mongoConnection = mongoose.connect(
            process.env.MONGO_URL, //'mongodb://localhost:27017/gobarber',
            { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true}
        );
    }
}

export default new Database; //sempre exportar o metodo principal criado na class 