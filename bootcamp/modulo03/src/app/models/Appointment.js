import Sequelize, { Model } from 'sequelize';
class Appointment extends Model {
    static init(sequelize) {
        super.init(
        {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        },
        {
            sequelize,
        }
        );
        
        return this;
    }
    static associate(models) {
        //esses metodos vao ser chamados pelo loader de models
                        //vai pertecenter a um usuario pq um usuario marcou um agendamento
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
                        //vai pertencer um usuario, mas para o provider ter o registro
        this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
                    //quando um model tem relacionamento duas vezs com uma tabela, tem que usar o as: 'apelidp'
    }
}    

export default Appointment;