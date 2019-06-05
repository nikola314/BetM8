const Sequelize = require('sequelize');

const sequelize = new Sequelize('velja', 'root', 'larasvinja', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
