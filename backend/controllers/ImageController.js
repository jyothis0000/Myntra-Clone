const express = require('express')
const images = express.Router()
const cors = require("cors")
var bodyParser = require('body-parser')

const Imageurl = require('../model/ImageScheme')
images.use(cors())
images.use(bodyParser.json())

const add = async (req, res) => {
  const imageData = {
    image:req.body.image ,
    name:req.body.name
  }

  Imageurl.findOne({
     image: req.body.image
   })
     .then(image => {
       if (!image) {
          Imageurl.create(imageData)
            .then(images => {
              res.json({ status: images + 'added!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
       } else {
         res.json({ error: 'Src already exists' })
       }
     })
     .catch(err => {
       res.send('error: ' + err)
     })
}

const get = async(req, res) => {
            await Imageurl.find()
            .then(images => {
              res.json(images)            
            })
            .catch(err => {
              res.status(400).json('error: ' + err)
            })
}



module.exports = {
  add: add,
  get: get
//   update: update
}
