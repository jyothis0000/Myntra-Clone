const express = require('express')
const router = express.Router()
const WishController = require('../controllers/WidhlistController')


router.post('/add', WishController.add)
router.get('/get', WishController.get)
router.post('/getuser', WishController.getuser)
router.post('/wishdelete', WishController.wishdelete)
module.exports = router