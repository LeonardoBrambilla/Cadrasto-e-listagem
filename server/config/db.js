const mongoose = require("mongoose")

const connectDB = async (connect) => {
  await mongoose.connect(connect,()=>console.log('connnect to db!')
  )
}

module.exports = connectDB