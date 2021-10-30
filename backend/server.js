var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
const mongoose = require('mongoose')
var port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({extended: true})
)

const mongoURI = 'mongodb://localhost:27017/myndra';
mongoose.connect(mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify :false })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

var Users = require('./route/api')
app.use('/users', Users)
var Products = require('./route/product')
app.use('/products', Products)
var Images = require('./route/images')
app.use('/images', Images)
var Address = require('./route/address')
app.use('/address', Address)
var AllProducts = require('./route/AllProductRoute')
app.use('/allproduct', AllProducts)
var Card = require('./route/Card')
app.use('/card', Card)
var order = require('./route/order')
app.use( '/order', order)
var wish = require('./route/WishlistRoute')
app.use( '/wish', wish)

app.listen(port, () => {
  console.log('Server is running on port: ' + port)
})
