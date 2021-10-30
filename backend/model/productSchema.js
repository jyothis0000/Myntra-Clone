const mongoose = require('mongoose')

// Create Schema
const ProductSchema = new mongoose.Schema({
  image:{type:String,required:true},
  name:{type:String,required:true},
  hint:{type:String,require:true},
  link:{type:String,require:true}
})

module.exports = Product = mongoose.model('products', ProductSchema)
