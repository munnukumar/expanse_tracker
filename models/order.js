const dataType = require("sequelize");

const sequelize = require("../utils/database");

const Order = sequelize.define('order', {
    paymentId: dataType.STRING,
    orderId: dataType.STRING,
    status: dataType.STRING
})

module.exports = Order;