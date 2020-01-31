require('dotenv/config');

module.exports = {
    dialect: 'postgres',
    host: process.env.DB_HOST,      // host: 'localhost',
    username: process.env.DB_USER,  // username: 'postgres',
    password: process.env.DB_PASS,  // password: 'docker',
    database: process.env.DB_NAME,  // database: 'gobarber',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};