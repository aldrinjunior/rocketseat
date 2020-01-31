module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('appointments', { 
        id: { 
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        date: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        user_id:{ //esse é para marcar qual usuario que está fazendo o agendameto 
          type: Sequelize.INTEGER,
          references: { model: 'users', key: 'id' }, //vai fazer relacionamento ao usuario
          onUpdate: 'CASCADE',
          onDelte: 'SET NULL', //quando deletar, manter os agendamentos para o admin
          allowNull: true,
        },
        provider_id: { //e aqui é um relacionamento para mostar quem é o fornecedor que está atendendo
          type: Sequelize.INTEGER,
          references: { model: 'users', key: 'id' }, 
          onUpdate: 'CASCADE',
          onDelte: 'SET NULL',
          allowNull: true,
        },
        canceled_at: { //se o agendamento for cancelado, não vai deletar do banco de dados
          type: Sequelize.DATE,
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

      return queryInterface.dropTable('appointments');
  }
};
