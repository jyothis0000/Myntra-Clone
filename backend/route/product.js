const express = require('express')
const router = express.Router()
const productController = require('../controllers/ProductController')

router.post('/add', productController.add)
router.get('/get', productController.get)
module.exports = router