const Sequelize = require("sequelize");

const sequelize = new Sequelize("expanse-tracker", "root", "8521", {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;