const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./utils/database.js");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const expanseRoute = require("./routes/expense");

app.use('/expense', expanseRoute);

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
