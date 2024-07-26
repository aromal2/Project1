const express = require("express")
const app = express()
const cors = require("cors");
const bodyparser = require("body-parser")
const routes =require("./routes/routes")
const connectDB = require("../Backend/connection/connection")
const intialize = require("./helpers/table")
app.use(cors());
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));

intialize()

app.use("/api", routes);

app.listen(5000,()=>{
    console.log("Server is running");
})