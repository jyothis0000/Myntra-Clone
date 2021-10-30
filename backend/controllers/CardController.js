const express = require('express')
const cards = express.Router()
const cors = require("cors")
var bodyParser = require('body-parser')

const Carddata = require('../model/CardSchema')
const Productdata = require('../model/AllProductSchema')
const Userdata = require('./../model/UserSchema')
cards.use(cors())
cards.use(bodyParser.json())

const add = async (req, res) => {

  Productdata.findOne({code:req.body.code})
  .then(data=>{
    Userdata.findOne({email:req.body.email})
    .then(userdatas =>{
      Carddata.findOne({product:data._id,user:userdatas._id})
      .then(cart=>{
        console.log('product',data._id,"userdata",userdatas._id,'cart',cart)
        if(cart){
          res.json({
            message:['Already Added this product in your cart.']
          })
        }
        else{
           new Carddata({
            user: userdatas._id,
            size:req.body.size,
            qty: 1,
            product: data._id
          }).save()
          .then(cards => {
            res.json({
              message:['create sucessfully',cards]
            })
          })
      
          .catch(err => {
            res.send('error: ' + err)
          })
        
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })
  .catch(err => {
    res.send('error: ' + err)
  })
})
.catch(err => {
  res.send('error: ' + err)
})


}

const get = async(req, res) => {
            await Carddata.find()
            .populate('product')
            .populate('user')
            //.populate('user')
            .then(cards => {
              res.json(cards)            
            })
            .catch(err => {
              res.status(400).json('error: ' + err)
            })
}

const getuser = async(req, res) => {
  let id = req.body.id;
            await Carddata.find({user:id})
            .populate('product')
            .populate('user')
            .then(cards => {
              res.json(cards)            
            })
            .catch(err => {
              res.status(400).json('error: ' + err)
            })
}

const cartdelete = async (req, res) => {
  let id = req.body.id;
  console.log(id);
            await Carddata.deleteOne({_id:id})
            .then(cards => {
              res.json(cards)            
            })
            .catch(err => {
              res.status(400).json('error: ' + err)
            })
}

const update = async (req, res) => {
  console.log('cartid',req.body.id)
  Carddata.findById(req.body.id)
  .then(cart => {
    console.log(cart)
    console.log('user',req.body.user)
    if(cart.user == req.body.user){
      if(req.body.size == null || req.body.size == undefined || req.body.size == 'undefined'|| req.body.size == ''){
        console.log(req.body.qty)
        let updateData = {
          qty: req.body.qty
        }
        Carddata.updateOne({_id:cart._id},{$set:updateData})  
        .then(cards => {
          res.json(cards)            
        })
        .catch(err => {
          res.status(400).json('error: ' + err)
        })
      }
      else if(req.body.qty == null || req.body.qty == undefined || req.body.qty == 'undefined'|| req.body.qty == ''){
        console.log(req.body.size)
        let updateData = {
          size: req.body.size
        }
        Carddata.updateOne({_id:cart._id},{$set:updateData})  
        .then(cards => {
          res.json(cards)            
        })
        .catch(err => {
          res.status(400).json('error: ' + err)
        })
      }
    }
    else{
      res.json({
        message:'you cannot update this cart details'
      })      
    }

  })  

}

module.exports = {
  add: add,
  get: get,
  getuser: getuser,
  cartdelete:cartdelete,
  update: update
}
