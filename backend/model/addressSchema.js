const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true        
    },
    phone:{
        type:Number,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    locality:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true        
    },
    addresstype:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = mongoose.model('address',addressSchema)