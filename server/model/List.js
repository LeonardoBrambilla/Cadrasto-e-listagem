const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  name: String,
  description: String,
  value: Number,
  sell: {
    type: Boolean,
    default: false
  }  
})

const List = mongoose.model("Lista", ListSchema);

module.exports = List