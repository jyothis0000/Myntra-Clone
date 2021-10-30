const User = require('../model/UserSchema')
const AllProduct = require('../model/AllProductSchema')

const add = async (req, res) => {
  
  const productData = {
    userid: req.userData._id,
    productname: req.body.productname,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    code: req.body.code,
    producttype: req.body.producttype,
    size: req.body.size,    
    color: req.body.color,
    brand: req.body.brand,
    by: req.body.by
  }
  User.findOne({_id: req.userData._id,usertype:"admin"})
  .then(user =>{
    if (user) {
      AllProduct.findOne({code: productData.code})
      .then(product =>{
        if(!product){
        AllProduct.create(productData)
            .then(products => {
              res.json({ status: products + 'added!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        }
        else{
          res.json({ error: 'This Product Already Exist' })                
        }
    
      })
    }
    else{
      res.json({ error: 'This User Cannot Post Anything' })      
    }
  })

}




const getById = async(req, res) => {
  await AllProduct.find({code:req.params.code})
  .then(products => {
    res.json(products)            
  })
  .catch(err => {
    res.status(400).json('error: ' + err)
  })
}

const filter = async(req, res) => {
  await AllProduct.find(req.body)
  .then(products => {
    res.json(products)            
  })
  .catch(err => {
    res.status(400).json('error: ' + err)
  })
}


const update = async (req, res) => {

  const updateData = {
    userid: req.userData._id,
    productname: req.body.productname,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    code: req.body.code,
    producttype: req.body.producttype,
    size: req.body.size,    
    color: req.body.color,
    brand: req.body.brand,
    by: req.body.by
  }

      User.findOne({_id: req.userData._id,usertype:"admin"})
      .then(user =>{
        if (user) {
          AllProduct.findOne({code: updateData.code,by: updateData.by})
          .then(product =>{
            if(product){
              AllProduct.updateOne({code:updateData.code},{$set:updateData})
              .then(users => {res.json(updateData)})
                  .catch(err => {res.send('error: ' + err)})
            }
            else{
              res.json({ error: 'Does not have this product in this list' })                
            }
        
          })
        }
        else{
          res.json({ error: 'This User Cannot Update Anything' })      
        }
      })
 

}


const remove = async (req, res) => {

  const removeData = {
    code: req.body.code,
    by: req.body.by
  }
      User.findOne({_id: req.userData._id,usertype:"admin"})
      .then(user =>{
        if (user) {
          AllProduct.findOne({code: removeData.code,by: removeData.by})
          .then(product =>{
            if(product){
              AllProduct.deleteOne({code:removeData.code})
              .then(users => {res.json({data: req.body,message:'deleted.'})})
                  .catch(err => {res.send('error: ' + err)})
            }
            else{
              res.json({ error: 'Does not have this product in this list' })                
            }
        
          })
        }
        else{
          res.json({ error: 'This User Cannot Update Anything' })      
        }
      })
 

}



module.exports = {
  add: add,
  getById: getById,
  update: update,
  remove: remove,
  filter: filter

}
