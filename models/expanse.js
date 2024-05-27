const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const expanse = sequelize.define('expanse',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    expense:{
        type: Sequelize.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    income: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    itemName: {
        type: Sequelize.STRING
    },
    category: {
        type: Sequelize.STRING
    }
    
});

module.exports = expanse;