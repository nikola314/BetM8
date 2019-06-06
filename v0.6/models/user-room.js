/* 
  Authors:
    -Nikola Kesic
    -Dimitrije Milenkovic
*/

const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const UserRoom = sequelize.define('userroom', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    points: Sequelize.INTEGER
});

module.exports = UserRoom;