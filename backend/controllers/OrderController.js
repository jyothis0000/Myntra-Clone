const Order = require('./../model/OrderSchema')
const Cart = require('./../model/CardSchema')
const Address = require('./../model/addressSchema')
var monthName    = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var d = new Date();
var date = d.getUTCDate();
var months = d.getUTCMonth(); // Since getUTCMonth() returns month from 0-11 not 1-12
var year = d.getUTCFullYear();
var month = monthName[months]
var dateStr = date + "/" + month + "/" + year;

exports.add = async (req, res) => {
    let id = req.body.id;
    let cart = req.body.cart;
    if (id != null && id != 'undefind') {
        Cart.find({ _id: { $in: cart } }).then(data => {
            let order = data.map(x => { return { product: x.product, qty: x.qty, size: x.size } });
            Address.findOne({ _id:req.body.address}).then(z => {
                let addressData ={       
                name:z.name,
                phone:z.phone,
                pincode:z.pincode,
                address:z.address,
                locality:z.locality,
                city:z.city,
                state:z.state,
                country:z.country,
                addresstype:z.addresstype
            }
            let totol ={
                user: id,
                products: order,
                address: addressData,
                price: req.body.price,
                status: "Placed",
                paymentstatus: "Cash On delivery",
                date:dateStr
            }
            Order.create(totol)
            .then(docs => {
                
                Cart.deleteMany({ _id: { $in: cart } })
                .then(docs => {
                    console.log(docs)
                }).catch(err => {
                    console.log(err)
                })          
                res.json(docs)
            }).catch(err => {
                res.json(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })
        }).catch(err => {
            res.json(err);
        })
    }
}

exports.readUser = async (req, res) => {
    let id = req.body.id;
    Order.find({ user: id })
        .populate('user')
        .populate('products.product')
        .then(docs => {
            res.json(docs);
        }).catch(err => {
            res.json(err)
        })
}

exports.readProductId = async (req, res) => {
    let id = req.params.id;
    Order.find({ 'products._id': id },
        {products:
            {$elemMatch:
                {
                    _id: id
                }
            }
        })
        .populate('products.product')
        .then(docs => {
            res.json(docs);
        }).catch(err => {
            res.json(err)
        })
}

exports.readId = async (req, res) => {
    let id = req.params.id;
    Order.find({ _id: id })
    .populate('user')
    .populate('products.product')
        .then(docs => {
            res.json(docs);
        }).catch(err => {
            res.json(err)
        })
}

exports.readAll = async (req, res) => {
    let id = req.body.id;
    Order.find()
        .then(docs => {
            res.json(docs);
        }).catch(err => {
            res.json(err)
        })
}

exports.edit = async (req, res) => {
    let id = req.body.id;
    Order.findOne({ _id: id })
        .then(orders => {
            if (orders) {
                Order.updateOne({ _id: id }, { $set: {status:req.body.status,date:dateStr} })
                    .then(users => { res.json({ message: "updated successfully" }) })
                    .catch(err => { res.send('error: ' + err) })
            }
            else {
                res.json({ error: 'Does not have this product in this list' })
            }
        })
}

exports.drop = async (req, res) => {
    let id = req.body.id;
    Order.deleteOne({ _id: id })
        .then(docs => {
            res.json(docs);
        }).catch(err => {
            res.json(err)
        })
}
