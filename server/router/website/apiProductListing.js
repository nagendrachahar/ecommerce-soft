const express = require('express'); 
const router = express.Router(); 
const objectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
// const verifyToken = require('../Utils/verifyToken'); 
// const isSeller = require('../Utils/isSeller'); 

// Require Branch model in our routes module 

const Product = require('../../model/masters/product.model'); 

router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({extended:false})); 

router.use(cors());

router.post('/api/web/getProductList', async (req,res, next) => { 
  let data = req.body; 
  
  let filter = {}; 
  let priceFilter = {}; 
  // for price filter
  if('minPrice' in data || 'maxPrice' in data){
    if('minPrice' in data){
      priceFilter = {$gte: Number(data.minPrice)}
    }
  
    if('maxPrice' in data){
      priceFilter = {$lt: Number(data.maxPrice), ...priceFilter}
    }
  
    filter["RevisedPrice"] = priceFilter;
  }
  
  // for seller filter
  if('s' in data){
    if(objectID.isValid(data.s)){
      filter["sellerId"] =  objectID(data.s);
    }
  }

  //for brand filter
  if('brand' in data){
    const brands = data.brand.split(",");
    for(let i=0; i<brands.length; i++){
      brands[i] = objectID(brands[i])
    }

    filter['brandId'] = { $in: brands }
  }

  const product = await Product.aggregate([
    {$match: filter},
    {$lookup:{
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
    }},
    {$unwind:"$Brand"},
    {$project:
      {
        _id:1,
        productName:1, 
        photoPath:1, 
        RevisedPrice:1,
        brandName: "$Brand.brandName"
      }
    }
  ])

  res.status(200).json({
    resType: 'success',
    message: '',
    product: product
  });

}); 


router.get('/api/web/getProductDetail', async (req,res, next) => { 
  
  //const product = await Product.findById(req.query.pid, '_id RevisedPrice brandId discription photoPath productName sellerId').populate('brandId sellerId');

  const product = await Product.aggregate([
    {$match: {_id: objectID(req.query.pid)}},
    {$lookup:
      {
        from: "Brand",
        localField: "brandId",
        foreignField: "_id",
        as: "Brand"
      }
    },
    {$unwind:"$Brand"},
    {$lookup:
      {
        from: "Seller",
        localField: "sellerId",
        foreignField: "_id",
        as: "Seller"
      }
    },
    {$unwind:"$Seller"},
    {$project:
      {
        _id:1,
        productName:1, 
        photoPath:1, 
        RevisedPrice:1,
        brandName: "$Brand.brandName",
        discription:1,
        sellerName: "$Seller.sellerName",
      }
    }
  ])

  res.status(200).json({
    resType: 'success',
    message: '',
    product: product
  });

}); 

module.exports = router;
