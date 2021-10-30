const express = require('express')
const router = express.Router()
const imageController = require('../controllers/ImageController')

router.post('/add', imageController.add)
router.get('/get', imageController.get)
module.exports = router