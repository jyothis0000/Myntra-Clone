const express = require('express')
const router = express.Router()
const cheackAuth = require('./../MiddleWare/CheakAuth')
const AddressController = require('../controllers/AddressController')

router.post('/add', AddressController.add)
router.get('/readall', AddressController.readall)
router.post('/read', AddressController.read)
router.post('/drop', AddressController.drop)
router.put('/update', AddressController.update)
module.exports = router