/* 
  Authors:
    -Nikola Kesic
    -Dimitrije Milenkovic
*/

const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mail: {
        type: Sequelize.STRING,
        allowNull: false
    },
    country: Sequelize.STRING,
    type: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    money: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    canCreateRoom: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

module.exports = User;