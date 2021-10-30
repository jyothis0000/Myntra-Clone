const mongoose = require('mongoose')
const AllProduct=require('./AllProductSchema')

// Create Schema
const WishSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },    
  product:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AllProducts'
  }
});

module.exports = mongoose.model('Wish', WishSchema)
