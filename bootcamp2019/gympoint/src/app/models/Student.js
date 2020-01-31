import Sequelize, { Model } from 'sequelize';
// precisa criar um controller para editar essa porra
class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.INTEGER,
        weight: Sequelize.DOUBLE,
        height: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );
  }
}

export default User;
