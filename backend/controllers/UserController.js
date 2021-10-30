const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../model/UserSchema')
users.use(cors())

process.env.SECRET_KEY = 'secret'

const register = async (req, res) => {
  const today = new Date()
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    usertype: req.body.usertype,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    created: today
  }

  User.findOne({
    email: req.body.email
  })
  .then(async user => {
  if (typeof userData.first_name === 'undefined' || userData.first_name === '' ) {
    res.status(400).json({ message:'First Name Was Not Entered'})
  }
  else if ( userData.first_name.length<2) {
    res.status(400).json({ message:'first Name atleast contain three letters'})
  }
  else if (typeof userData.last_name === 'undefined' || userData.last_name === '') {
    res.status(400).json({ message:'last Name Was Not Entered'})
  }
  else if (typeof userData.phone === 'undefined' || userData.phone === '') {
    res.status(400).json({ message:'Phone Was Not Entered'})
  }
  else if (typeof userData.email === 'undefined' || userData.email === '') {
    res.status(400).json({ message:'Email Was Not Entered'})
  }
  else if ( userData.phone.length > 10 || userData.phone.length < 10 ) {
    res.status(400).json({ message:'Please enter the valid phone number'})
  }
  else if (typeof userData.password === 'undefined' || userData.password === '') {
    res.status(400).json({ message:'Password Was Not Entered'})
  }
  else if ( userData.password.length<=5) {
    res.status(400).json({ message:'Password atleast contain six letters'})
  }
  else{
    if(userData.usertype == null || userData.usertype === 'undefined')
    {
      userData.usertype = "user";
    }
    else{
      userData.usertype = "admin";      
    }
      if (!user) {
          const salt =await bcrypt.genSalt(10);
          userData.password =await bcrypt.hash(userData.password, salt);
          await User.create(userData)
            .then(user => {
              res.json({ message: 'Registered Successfully',
            Users:{
              FirstName: userData.first_name,
              LastName: userData.last_name,
              usertype: userData.usertype,
              Phone: userData.phone,
              Email: userData.email,
              Password: userData.password
            }
            })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
      } else {
        res.status(400).json({ message: 'User already exists' })
      }
    }
})
    .catch(err => {
      res.send('error: ' + err)
    })
};

const login = async (req, res) => {
  if (typeof req.body.email === 'undefined' || req.body.email === '') {
    res.status(400).json({ message:'please enter the correct email'})
  }
  else if (typeof req.body.password === 'undefined' || req.body.password === '') {
    res.status(400).json({ message:'Password atleast contain six letters'})
  }
  else{
  User.findOne({
    email: req.body.email
  }).then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // Passwords match
          const payload = {
            _id: user._id,
            "usertype": user.usertype,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone
          }
          var token = jwt.sign(payload, process.env.SECRET_KEY, { 
            expiresIn: 5000
          })
          res.send(token)
        } else {
          // Passwords don't match
          res.json({ error: 'User does nots exist' })
        }
      } else {
        res.json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}}

const profile = async (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

const update = async (req, res) => {

  var decoded = jwt.verify(req.headers['authorization']||req.body.token,'secret')
  console.log(req.body.token);


  const userData = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.phone,
    email: req.body.email
  })

  User.findOne({
    _id: decoded._id
  }).then(user => {
    if (typeof userData.first_name === 'undefined' || userData.first_name === '' ) {
      res.status(400).json({ message:'First Name Was Not Entered'})
    }
    else if ( userData.first_name.length<2) {
      res.status(400).json({ message:'first Name atleast contain three letters'})
    }
    else if (typeof userData.last_name === 'undefined' || userData.last_name === '') {
      res.status(400).json({ message:'last Name Was Not Entered'})
    }
    else if (typeof userData.phone === 'undefined' || userData.phone === '') {
      res.status(400).json({ message:'Phone Was Not Entered'})
    }
    else if (typeof userData.email === 'undefined' || userData.email === '') {
      res.status(400).json({ message:'Email Was Not Entered'})
    }
    else if ( userData.phone.length > 10 || userData.phone.length < 10 ) {
      res.status(400).json({ message:'Please enter the valid phone number'})
    }
    else{
      if (user) {
          User.updateOne({_id:decoded._id},{$set:req.body}).then(users => {res.json(userData)})
            .catch(err => {res.send('error: ' + err)})
      } else {
        res.json({ error: 'User does not exists' })
      }
    }})
    .catch(err => {
      res.send('error: ' + err)
    })
}

module.exports = {
  register:register,
  update:update,
  login:login,
  profile:profile
}

