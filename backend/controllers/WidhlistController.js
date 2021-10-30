const express = require('express')
const cards = express.Router()
const cors = require("cors")
var bodyParser = require('body-parser')

const Wishdata = require('../model/WishListSchema')
const Productdata = require('../model/AllProductSchema')
const CartData = require('./../model/CardSchema') 
cards.use(cors())
cards.use(bodyParser.json())

const add = async (req, res) => {

    Productdata.findOne({code:req.body.product})
    .then(product => {
        Wishdata.find({product:product._id,user:req.body.user})
        .then(wish=>{
          if(wish.length === 0){
            new Wishdata({
             user: req.body.user,
             product: product._id
           }).save()
           .then(wish => {
               CartData.findOneAndDelete({product:product._id,user:req.body.user})
               .then(cart => {console.log(cart)})
               .catch(err => {console.log(err)})
             res.json({
               message:['create sucessfully']
             })
           })
           .catch(err => {
             res.send('error: ' + err)
           })        
          }
          else{
            res.json({
              message:['Already Added this product in your cart.']
            })
          }
        })
        .catch(err => {
          res.send('error: ' + err)
        })
    })
    .catch(err => {
        console.log(err)
    })
}

const get = async(req, res) => {
            await Wishdata.find()
            .populate('product')
            .populate('user')
            .then(cards => {
              res.json(cards)            
            })
            .catch(err => {
              res.status(400).json('error: ' + err)
            })
}

const getuser = async(req, res) => {
  let id = req.body.id;
            await Wishdata.find({user:id})
            .populate('product')
            .populate('user')
            .then(cards => {
              res.json(cards)            
            })
            .catch(err => {
              res.status(400).json('error: ' + err)
            })
}

const wishdelete = async (req, res) => {
  let id = req.body.id;
            await Wishdata.deleteOne({_id:id})
            .then(cards => {
              res.json(cards)            
            })
            .catch(err => {
              res.status(400).json('error: ' + err)
            })
}



module.exports = {
  add: add,
  get: get,
  getuser: getuser,
  wishdelete:wishdelete
}
