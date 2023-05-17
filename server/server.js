const express = require("express")
const app = express()
require('dotenv').config();
const connnectDB = require("./config/db")
connnectDB()
const cors = require("cors")
app.use(cors())
app.use(express.json())


app.use("/",require("./routes/routes"))



const PORT = process.env.PORT || 5000

app.listen(PORT,()=>console.log("Server is running")) 