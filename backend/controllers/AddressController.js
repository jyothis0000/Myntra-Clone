const address = require('./../model/addressSchema')
const User = require('./../model/UserSchema')

exports.add = (req,res) => {
   User.findOne({_id:req.body.user})
   .then(users =>{
       console.log(users);
       
       if(users.usertype == "user"){
        var addressData = {
            name: req.body.name,
            phone: req.body.phone,
            pincode: req.body.pincode,
            address: req.body.address,
            locality: req.body.locality,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            addresstype: req.body.addresstype,
            user: users._id
           }
           console.log(addressData);
           
           address.create(addressData)
           .then(addr =>{
            res.json({
                message:['create sucessfully',addr]
            })
           })
           .catch(err => {
            res.status(400).json('error: ' + err)
          })
       }
       else{
        res.json({
            message:['you cannot create address']
          })

       }
   })
   .catch(err => {
    res.status(400).json('error: ' + err)
  })
}

exports.read = (req,res) => {
    address.find({user:req.body.user})
    .then(addr => {
        res.json(addr)            
      })
      .catch(err => {
        res.status(400).json('error: ' + err)
      })
 }

 exports.readall = (req,res) => {
    address.find()
    .then(addr => {
        res.json(addr)            
      })
      .catch(err => {
        res.status(400).json('error: ' + err)
      })
 }

 exports.update = (req,res) => {
    address.findOne({_id:req.body.id})
    .then(addr => {
        if(addr.user != req.body.user){
            res.json({
                message:['you cannot update this address']
              })
           }
           else{
               const addressData = {
                name: req.body.name,
                phone: req.body.phone,
                pincode: req.body.pincode,
                address: req.body.address,
                locality: req.body.locality,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                addresstype: req.body.addresstype
               }
               address.updateOne({_id:req.body.id},{$set:addressData})
               .then(addr =>{
                res.json({
                    message:['updated sucessfully',addr]
                })
               })
               .catch(err => {
                res.status(400).json('error: ' + err)
              })
           }
      })
      .catch(err => {
        res.status(400).json('error: ' + err)
      })
 }

 exports.drop = (req,res) => {
    address.findOne({_id:req.body.id})
    .then(addr => {
        if(addr.user != req.body.user){
            res.json({
                message:['you cannot delete this address']
              })
           }
           else{
               address.deleteOne({_id:req.body.id})
               .then(addr =>{
                res.json({
                    message:['deleted sucessfully',addr]
                })
               })
               .catch(err => {
                res.status(400).json('error: ' + err)
              })
           }
      })
      .catch(err => {
        res.status(400).json('error: ' + err)
      })
 }