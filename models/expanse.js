const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const expanse = sequelize.define('expanse',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    amount:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    itemName: {
        type: Sequelize.STRING
    },
    category: {
        type: Sequelize.STRING
    }
    
});

module.exports = expanse;