const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('hospital_management', 'root', 'rohan123', {
  host: 'localhost',   // Correct host!
  port: 3307,          // Correct port!
  dialect: 'mysql'
});

module.exports = sequelize;
