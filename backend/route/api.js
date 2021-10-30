const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')

router.post('/register', userController.register)
router.post('/Login', userController.login)
router.get('/profile', userController.profile)
router.put('/update', userController.update)
module.exports = router