const mongoose = require('mongoose')

// Create Schema
const ImageSchema = new mongoose.Schema({
  image:String,
  name:String
})

module.exports = Imageurl = mongoose.model('images', ImageSchema)
