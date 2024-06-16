const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv')
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const mongoose = require("mongoose");

dotenv.config();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
app.use(helmet());
app.use(compression());
// app.use(morgan("combined", { stream: accessLogStream }));


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

mongoose.connect(process.env.MONGO_URL)
.then(() =>{
    app.listen(process.env.PORT || 3000, ()=>{
        console.log(`Server is listing on PORT: ${process.env.PORT}`)
    })
})
.catch(err =>{
    console.log(err);
})
