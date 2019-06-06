/* 
  Authors:
    -Nikola Kesic
    -Dimitrije Milenkovic
*/

const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Room = sequelize.define('room', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    visibility: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    distributionType: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    scoringType: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    sport: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    minPlayers: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    maxPlayers: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    membersCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    entryFee: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    dateBegin: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    dateEnd: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    latestLeave: {
        type: Sequelize.DATE,
        allowNull: false,
    }
});

module.exports = Room;