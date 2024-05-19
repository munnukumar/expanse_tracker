const dataType = require("sequelize");

const sequelize = require("../utils/database");

const User = sequelize.define('user', {
    id:{
        type: dataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: dataType.STRING,
        allowNull : false
    },
    email: {
        type: dataType.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: dataType.STRING,
        allowNull: false
    },
    mobile_No :{
        type: dataType.INTEGER,
        allowNull: false
    }

});

module.exports = User