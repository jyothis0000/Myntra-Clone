const mongoose = require('mongoose')

const Order = new mongoose.Schema({

    products: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'AllProducts'
            },
            qty:{
                type:String,
                required:true
            },
            size: {
                type: String,
                required: true
            }
        }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
     },
    address:  {
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
        }
    },
    price: {
        type: Number,
        required: true
    },
    status:{
        type:String,
        required:true
    },
    paymentstatus:{
        type:String,
        required:true
    },
    orderid:{
    type:Number,
    default:() => {
        return Math.floor((Math.random()*7000000000)*Math.random())+300000000000
    },
    createIndexes:{unique:true}
    },
    date:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model('order', Order)  