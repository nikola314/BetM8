/* 
  Authors:
    -Nikola Kesic
    -Dimitrije Milenkovic
*/

const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Request = sequelize.define('request', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    roomId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    isActive: {
        type: Sequelize.INTEGER,
    }
});

module.exports = Request;