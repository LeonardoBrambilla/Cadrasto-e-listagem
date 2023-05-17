const express = require("express")
const app = express()
require('dotenv').config();
const connnectDB = require("./config/db")
const cors = require("cors")
app.use(cors())
app.use(express.json())


app.use("/",require("./routes/routes"))


const port = process.env.PORT || 5000

const start = async()=>{ 
  try{
    app.listen(port,()=>
      console.log('Server is running on port 5000')
    )
    await connnectDB(process.env.DB_CONNECT)
  } catch(error){
    console.log(error)
  }
}

start()