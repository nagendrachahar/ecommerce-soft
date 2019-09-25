var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const cors = require('cors');
const objectID = require('mongodb').ObjectID;
const verifyToken = require('../Utils/verifyToken');
// Require Branch model in our routes module

const Product = require('../../model/masters/product.model'); 
const Cart = require('../../model/masters/cart.model'); 

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

router.use(cors());

router.post('/api/web/apiCart/addToCart', verifyToken("none"), async (req,res, next) => {
  const {userType, id} = res.locals.decoded;
  console.log(req.query.pid);
  if(userType === "Customer"){

    let cart = await Cart.findOne({productId: req.query.pid, customerId: id});
    const data = {};
    console.log(cart)
    if(cart == null){

      const product = await Product.findOne({_id: req.query.pid});
      data.customerId = id;
      data.productId = product._id
      data.quantity = 1;

      cart = new Cart(data);

    }
    else{
      cart.quantity = cart.quantity + 1;
    }

    await cart.save();

    res.status(200).json({
      resType: 'success',
      message: 'item added',
      cart:cart
    });

  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }

});

router.post('/api/web/apiCart/removeFromCart', verifyToken("none"), async (req,res, next) => {
  const {userType, id} = res.locals.decoded;
  console.log(req.query.pid);
  if(userType === "Customer"){

    let cart = await Cart.findOne({productId: req.query.pid, customerId: id});
   
    if(cart != null){
      if(cart.quantity > 1){
        cart.quantity = cart.quantity - 1;
        await cart.save();
      }
      else{
        await Cart.deleteOne({productId: req.query.pid, customerId: id})
      }
    }

    res.status(200).json({
      resType: 'success',
      message: 'item Delete',
      cart:""
    });

  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }

});

// add local storage cart item in to Cart. login time
router.post('/api/web/apiCart/fillToCart', verifyToken("none"), async (req,res, next) => {
  const {userType, id} = res.locals.decoded;
  //console.log(req.query.pid);
  if(userType === "Customer"){
    console.log(req.body);

    // let cart = await Cart.findOne({productId: req.query.pid, customerId: id});
    // const data = {};
    // console.log(cart)
    // if(cart == null){

    //   const product = await Product.findOne({_id: req.query.pid});
    //   data.customerId = id;
    //   data.productId = product._id
    //   data.quantity = 1;

    //   cart = new Cart(data);

    // }
    // else{
    //   cart.quantity = cart.quantity + 1;
    // }

    // await cart.save();

    res.status(200).json({
      resType: 'success',
      message: 'item added',
      cart:"cart"
    });

  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }

});

router.get('/api/web/apiCart/fetchCartList', verifyToken("none"), async (req,res, next) => {
  const {userType, id} = res.locals.decoded;
  
  if(userType === "Customer"){

    //let cart = await Cart.find({customerId: id});

    let cart = await Cart.aggregate([
      {$match: {customerId: objectID(id)}},
      {
        $lookup: 
        {
          from: 'Product',
          let: { productId: '$productId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$_id', '$$productId'] }
                  ]
                }
              }
            },
            { $lookup: {
              from: "Brand",
              let: { "brandId": "$brandId" },
              pipeline: [
                { $match: { $expr: { $eq: ["$_id", "$$brandId"] }}}
              ],
              as: "Brand"
            }},
            {$unwind: {
              path: "$Brand",
              preserveNullAndEmptyArrays: true
            }}
          ],
          as: "Product"
        }
      },
      {
        $unwind: {
          path: "$Product",
          preserveNullAndEmptyArrays: true
        }
      },
      {$project: 
        {
          _id: 1, 
          quantity: 1, 
          productId: 1,
          brandName: {$ifNull: ["$Product.Brand.brandName", ""]},
          productName: "$Product.productName",
          photoPath: "$Product.photoPath", 
          RevisedPrice: "$Product.RevisedPrice"
        }
      }
    ]);

    res.status(200).json({
      resType: 'success',
      message: '',
      cart:cart
    });

  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }

});

// get cart total price
router.get('/api/web/apiCart/fetchCartTotal', verifyToken("none"), async (req,res, next) => {
  const {userType, id} = res.locals.decoded;
  console.log(id)
  if(userType === "Customer"){

    //let cart = await Cart.find({customerId: id});

    let cartTotal = await Cart.aggregate([
      {$match: {customerId: objectID(id)}},
      {
        $lookup: 
        {
          from: 'Product',
          let: { productId: '$productId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$_id', '$$productId'] }
                  ]
                }
              }
            }
          ],
          as: "Product"
        }
      },
      {
        $unwind: {
          path: "$Product",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group : {
          _id : "$customerId",
          totalAmount : {$sum: { $multiply: ["$Product.RevisedPrice", "$quantity"]}}
        }
      },
      {
        $project: {
          totalAmount: "$totalAmount"
        }
      }
      
    ]);

    if(cartTotal.length > 0){
      cartTotal = cartTotal[0]["totalAmount"]
    }
    else{
      cartTotal = 0
    }

    res.status(200).json({
      resType: 'success',
      message: '',
      cartTotal: cartTotal
    });

  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }

});


// for local storage cart list
router.post('/api/web/apiCart/fetchLocalStoreList', async (req,res, next) => {
  
  const data = req.body;
  let productIds = []

  for(let i=0; i<data.length; i++){
    productIds.push(objectID(data[i]['productId']));
  }

     let cart = await Product.aggregate([
       {$match: {_id: {$in: productIds}}},
       {
         $lookup: 
         {
           from: 'Brand',
           let: { brandId: '$brandId' },
           pipeline: [
             {
               $match: {
                 $expr: {
                   $and: [
                     { $eq: ['$_id', '$$brandId'] }
                   ]
                 }
                }
             }
           ],
           as: "Brand"
         }
       },
       {
         $unwind: {
           path: "$Brand",
           preserveNullAndEmptyArrays: true
         }
       },
       {$project: 
         {
           _id: 1, 
           quantity: 1, 
           productId: "$_id",
           brandName: {$ifNull: ["$Brand.brandName", ""]},
           productName: "$productName",
           photoPath: "$photoPath", 
           RevisedPrice: "$RevisedPrice"
         }
       }
     ]);

    for(let i = 0; i < cart.length; i++){

      for(let p = 0; p < data.length; p++){
        if(cart[i]["productId"] == data[p]["productId"]){
          cart[i]["quantity"] = data[p]["quantity"];
          break;
        }
      }

    }

    res.status(200).json({
      resType: 'success',
      message: '',
      cart: cart
    });

});

// for local storage cart total
router.post('/api/web/apiCart/fetchLocalStoreCartTotal', async (req,res, next) => {
  
  const data = req.body;
  let productIds = []

  for(let i=0; i<data.length; i++){
    productIds.push(objectID(data[i]['productId']));
  }
  console.log(data);

     let cart = await Product.aggregate([
       {$match: {_id: {$in: productIds}}},
       {$project: 
         {
           _id: 1, 
           productId: "$_id",
           RevisedPrice: "$RevisedPrice"
         }
       }
     ]);

     let cartTotal = 0;

      for(let i = 0; i < cart.length; i++){

        for(let p = 0; p < data.length; p++){
          if(cart[i]["productId"] == data[p]["productId"]){
            cartTotal += cart[i]["RevisedPrice"] * data[p]["quantity"];
          }
        }

      }

      res.status(200).json({
        resType: 'success',
        message: '',
        cartTotal: cartTotal
      });

});


module.exports = router;
