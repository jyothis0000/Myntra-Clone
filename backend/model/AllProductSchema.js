const mongoose = require('mongoose')


var AllProductSchema = new mongoose.Schema({
    userid:{
      type:String 
    },
    productname:{
      type: String,
      required: true
    },
    description:{
      type: String,
      required: true
    },
    price:{
      type: Number,
      required: true
    },
    image: {
      type: Array,
      required:true
    },
    producttype:{
      type:String,
      required:true
    },
    size:{
      type:Array,
      required: true
    },
    color:{
      type:String,
      required: true
    },
    brand:{
      type: String,
      reqiured:true
    },
    code:{
     type:String,
     required:true
    },
    by:{
      type: String,
      reqiured:true
    }
});

module.exports = mongoose.model('AllProducts', AllProductSchema)