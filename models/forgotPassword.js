const dataType = require("sequelize");
const sequelize = require("../utils/database");

const ForgotPasswordRequests = sequelize.define('forgotpasswordrequest', {
    id: {
        type: dataType.UUID,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: dataType.INTEGER,
        allowNull: false
    },
    isActive: {
        type: dataType.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
})

module.exports = ForgotPasswordRequests;