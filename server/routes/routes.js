const express = require('express')
const router = express.Router()


const {
  postProduct,
  getProduct
} = require("../components/list")
  
router.post('/',postProduct)

router.get('/',getProduct)

module.exports = router