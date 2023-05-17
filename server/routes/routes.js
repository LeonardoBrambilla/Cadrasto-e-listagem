const express = require('express')
const router = express.Router()


const {
  postProduct,
  getProduct,
  removeProduct
} = require("../components/list")
  
router.post('/',postProduct)

router.get('/',getProduct)

router.delete('/:id',removeProduct)

module.exports = router