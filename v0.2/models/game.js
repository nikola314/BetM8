const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Game = sequelize.define('game', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  team1: {
    type: Sequelize.STRING,
    allowNull: false
  },
  team2: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  result: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Game;