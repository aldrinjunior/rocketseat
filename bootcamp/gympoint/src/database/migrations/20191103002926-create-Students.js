module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('students', { 
        name:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        email:{
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        age: { 
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        provider: { //provider vai servir para diferenciar o adm dos usuarios 
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
  },
  down: (queryInterface, Sequelize) => {

      return queryInterface.dropTable('students');
  }
};
