const { Sequelize } = require('sequelize');
require('dotenv').config();
const PSQL_URL = process.env.PSQL_URL;
// Create a new instance of Sequelize with PostgreSQL .env var
const sequelize = new Sequelize(PSQL_URL, {
  dialect: 'postgres',
  logging: false,
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully, db file.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = sequelize;
