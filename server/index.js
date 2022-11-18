const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());


const db = require("./models");
//routes
const users = require("./routes/users");
app.use("/users", users);

db.sequelize.sync().then(()=>{
    app.listen(process.env.PORT || 3001, ()=>{
        console.log("server started!")
    })
}).catch((err)=>{
    console.log(`ERROR: ${err.message}`)
});