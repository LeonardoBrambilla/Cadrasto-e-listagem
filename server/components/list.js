const List = require("../model/List")

exports.postProduct = async(req,res) => {
  const {
    name,
    description,
    value,
    sell
  } = req.body
  const list = new List({
    name,
    description,
    value,
    sell
  })
  await list.save()
  res.status(201).send(req.body)
}

exports.getProduct = async (req,res) => {
  const data = await List.find()
  res.status(200).send(data)
}

exports.removeProduct = async (req,res) => {  
  const {id} = req.params
  await List.findOneAndDelete({_id:id})
  console.log(id)
  res.status(200).send(id)
}

