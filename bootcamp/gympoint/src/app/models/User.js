import Sequelize, { Model } from 'sequelize';
//tem que ver se precisa passar o parametro NAME como adm por default (para o adm nao precisar usar nada alem de email e senha)
import bcrypt from 'bcryptjs';

class User extends Model {
    static init(sequelize) {
        super.init({
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, //VIRTUAL pq não vai existir na base de dados
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
        },
        {
            sequelize,
        }
        );
        this.addHook('beforeSave', async user => {
            if (user.password) { //só vai gerar password hash quando criar um novo usuario com senha
                user.password_hash = await bcrypt.hash(user.password, 8); // final é a força da criptografia
            }
        }); //hook é para automatizar alguma função, no caso aqui, antes de salvar ele vai 
        
        return this;
    }
    checkPassword(password){
        return bcrypt.compare(password, this.password_hash);
    }
}    

export default User;