const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Message = sequelize.define('message', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  receiverId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isRead: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Message;