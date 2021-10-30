const mongoose = require('mongoose')
const AllProduct=require('./AllProductSchema')

// Create Schema
const CardSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  size:{
    type: String,
    required: true
  },
  qty:{
    type: Number,
    required: true
  },
  product:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AllProducts'
  }
});

module.exports = mongoose.model('Card', CardSchema)
