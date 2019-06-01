const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const RoomLeague = sequelize.define('roomleague', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = RoomLeague;