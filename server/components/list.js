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

