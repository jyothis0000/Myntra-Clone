const express = require('express')
const router = express.Router()
const cheackAuth = require('./../MiddleWare/CheakAuth')
const AllProductController = require('../controllers/AllProductController')

router.post('/add', cheackAuth, AllProductController.add)
router.get('/getById/:code', AllProductController.getById)
router.post('/filter', AllProductController.filter)
router.put('/update', cheackAuth, AllProductController.update)
router.delete('/remove', cheackAuth, AllProductController.remove)
module.exports = router