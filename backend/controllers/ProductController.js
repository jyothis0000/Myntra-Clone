const Product = require('../model/productSchema')

const add = async (req, res) => {
  const productData = {
    image:req.body.image,
    name:req.body.name,
    hint:req.body.hint,
    link:req.body.link
  }

  Product.findOne({
     image: req.body.image
   })
     .then(product => {
       if (!product) {
          Product.create(productData)
            .then(products => {
              res.json({ status: products + 'added!' })
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
            await Product.find()
            .then(products => {
              res.json(products)            
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
