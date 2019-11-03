import Sequelize, { Model } from 'sequelize';

class Students extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            age: Sequelize.STRING,
            weight: Sequelize.FLOAT,
            size: Sequelize.FLOAT,
            provider: Sequelize.BOOLEAN,
        },
        {
            sequelize
        }
        );
    }
}

export default Students;