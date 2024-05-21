const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv')

const sequelize = require("./utils/database.js");
const Order = require("./models/order");
const User = require("./models/user")
const Expense = require("./models/expanse")

const expanseRoute = require("./routes/expense");
const userRoute = require("./routes/user");
const purchaseRoute = require("./routes/purchase");

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

app.use('/expense', expanseRoute);
app.use('/user', userRoute);
app.use('/purchase', purchaseRoute);

Expense.belongsTo(User);
User.hasMany(Expense);

Order.belongsTo(User);
User.hasMany(Order);


const PORT = 3000;
sequelize
// .sync({force:true})
.sync()
.then(() =>{
    app.listen(PORT, ()=>{
        console.log(`Server is listing on PORT: ${PORT}`)
    })
})
.catch(err =>{
    console.log(err);
})
