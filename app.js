const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./utils/database.js");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const expanseRoute = require("./routes/expense");
const userRoute = require("./routes/user");

app.use('/expense', expanseRoute);
app.use('/user', userRoute);


const PORT = 3000;
sequelize
.sync()
.then(() =>{
    app.listen(PORT, ()=>{
        console.log(`Server is listing on PORT: ${PORT}`)
    })
})
.catch(err =>{
    console.log(err);
})
