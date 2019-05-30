const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Prediction = sequelize.define('prediction', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  result: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Prediction;