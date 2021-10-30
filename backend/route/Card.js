const express = require('express')
const router = express.Router()
const CardController = require('../controllers/CardController')


router.post('/add', CardController.add)
router.get('/get', CardController.get)
router.post('/getuser', CardController.getuser)
router.post('/cartdelete', CardController.cartdelete)
router.put('/cartupdate', CardController.update)
module.exports = router