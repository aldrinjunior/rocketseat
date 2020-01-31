module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('users', 'avatar_id', { 
          type: Sequelize.INTEGER,
          references: { model: 'files', key: 'id' }, //vai ref a tab files, e o id
          //o que vai acontecer com a imagem quando deletar o usuario referenciado pelo arquivo
          onUpdate: 'CASCADE',
          onDelte: 'SET NULL',
          allowNull: true,
        });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
