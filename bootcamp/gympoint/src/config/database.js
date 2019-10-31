module.exports = {  
    dialect: 'postgres',
    host: 'localhost',
    usernme: 'postgres',
    password: 'docker',
    database: 'gympoint',
    define: {
        timestamps: true,  //garante que vai ter uma coluna created at em cada interação no banco de dados
        underscored: true, //para usar a sintaxe user_groups
        underscoredAll: true,
    },
};