import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

class Appointment extends Model {
    static init(sequelize) {
        super.init(
        {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        past: {
            type: Sequelize.VIRTUAL,
            get() {
                return isBefore(this.date, new Date()); //verificar se a data é anterior a data atual, retorna falso se o horario ainda nao passou
            },
          },
          cancelable: { //para genrenciar a regra de negocio se ele está anterior à 2:00 do agendamento
              type: Sequelize.VIRTUAL,
              get() {
                  return isBefore(new Date(), subHours(this.date, 2));
              },
          },
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