
const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv')
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

dotenv.config();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
app.use(helmet());
app.use(compression());
app.use(morgan("combined", { stream: accessLogStream }));

const sequelize = require("./utils/database.js");
const Order = require("./models/order");
const User = require("./models/user")
const Expense = require("./models/expanse")
const ForgotPasswordRequests = require("./models/forgotPassword")
const Report = require("./models/report");

const expanseRoute = require("./routes/expense");
const userRoute = require("./routes/user");
const purchaseRoute = require("./routes/purchase");
const premiumRoute = require("./routes/premium");
const passwordRoute = require("./routes/password");

app.use('/expense', expanseRoute);
app.use('/user', userRoute);
app.use('/purchase', purchaseRoute);
app.use('/premium', premiumRoute);
app.use('/password', passwordRoute);

Expense.belongsTo(User);
User.hasMany(Expense);

Order.belongsTo(User);
User.hasMany(Order);

User.hasMany(ForgotPasswordRequests);
ForgotPasswordRequests.belongsTo(User);

User.hasMany(Report);
Report.belongsTo(User);


const PORT = process.env.PORT || 3000;
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
