const express = require('express')
const route = express.Router()
const orderController = require('./../controllers/OrderController')

route.post( '/add', orderController.add)
route.get( '/readall', orderController.readAll)
route.get( '/readProductid/:id', orderController.readProductId)
route.get( '/readid/:id', orderController.readId)
route.post( '/read', orderController.readUser)
route.post( '/drop', orderController.drop)
route.put( '/edit', orderController.edit)
module.exports = route