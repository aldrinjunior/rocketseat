import Sequelize, { Model } from 'sequelize';
//tem que ver se precisa passar o parametro NAME como adm por default (para o adm nao precisar usar nada alem de email e senha)
import bcrypt from 'bcryptjs';

class File extends Model {
    static init(sequelize) {
        super.init(
        {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
            type: Sequelize.VIRTUAL,
                get(){
                    return `http://localhost:3333/files/${this.path}`;
                },
            },
        },
        {
            sequelize,
        }
        );
        
        return this;
    }
}    

export default File;