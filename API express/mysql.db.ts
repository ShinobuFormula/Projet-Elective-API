const { Sequelize } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(process.env.MYSQL_DB_NAME, process.env.MYSQL_DB_USER, process.env.MYSQL_DB_PWD, {
    host: process.env.MYSQL_DB_HOST,
    dialect: 'mysql'
});

async function connection_test(){
    try {
        await sequelize.authenticate()
        console.log('MYSQL connected');
    } catch (error) {
        console.error('Unable to connect to the MYSQL database:', error);
    }
}

connection_test()

export default sequelize;