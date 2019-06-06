/* 
  Authors:
    -Nikola Kesic
    -Dimitrije Milenkovic
*/

const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'nikola', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;