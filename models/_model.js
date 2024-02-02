const { Sequelize } = require('sequelize');

const sequelizeInstance = new Sequelize(process.env.DDB_NAME, process.env.DDB_USER, process.env.DDB_PASSWORD, {
    host: process.env.DDB_HOST, 
    port: process.env.DDB_PORT,
    dialect: 'mysql',
});

module.exports = sequelizeInstance;
