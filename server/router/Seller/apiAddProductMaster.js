const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const verifyToken = require('../Utils/verifyToken');
const isSeller = require('../Utils/isSeller');
const currentDate = require('../Utils/getCurretDate');

// Require Company model in our routes module
let Product = require('../../model/masters/product.model');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/wwwroot/Product')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage });
router.use(cors());

router.post('/api/SaveProduct', verifyToken("none"), upload.single('image'), async (req, res, next) => {
  
  if(isSeller(res)){
    let data = req.body;

    if(req.file){
      data["photoPath"] = req.file.filename;
    }
    else{
      data["photoPath"] = "";
    }
    data["sellerId"] = res.locals.decoded.id;
    
    let product = new Product(data);

    await product.save()

    res.status(200).json({
      resType: 'success',
      message: 'product successfully saved'
    });

  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }
});


router.get('/api/getProductList', verifyToken("none"), async (req, res, next) => {
  if(isSeller(res)){
    const {id} = res.locals.decoded
    const product = await Product.find({sellerId: id});

    res.status(200).json({
      resType: 'success',
      message: '',
      product: product
    });

  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }
});

// Defined edit route
router.get('/api/getProductById/:id', verifyToken("none"), async (req, res, next) => {
  if(isSeller(res)){
    
    const product = await Product.findOne({ _id: req.params.id });

    res.status(200).json({
      resType: 'success',
      message: '',
      product: product
    });

  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }
  
});

//  Defined update route
router.post('/api/updateProductById/:id', verifyToken("none"), upload.single('image'), async (req, res, next) => {
  if(isSeller(res)){

    const {id} = res.locals.decoded
    const product = await Product.findById(req.params.id);

    product.productName = req.body.productName;
    product.price = req.body.price;
    product.category1 = req.body.category1;
    product.category2 = req.body.category2;
    product.category3 = req.body.category3;
    product.brandId = req.body.brandId;
    product.discription = req.body.discription;
    product.sellerId = id;
    product.isApproved = false;
    product.updateOn = currentDate();

    if(req.file){
      product.photoPath = req.file.filename;
    }

    await product.save();

    res.status(200).json({
      resType: 'success',
      message: 'Product updated'
    });

  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }
 
});

// Delete Product

router.delete('/api/deleteProduct/:id',verifyToken("none"), async (req, res, next) => {
  if(isSeller(res)){
    
    const product = await Product.findByIdAndRemove({_id: req.params.id});
    
    res.status(200).json({
      resType: 'success',
      message: 'Product removed',
      product: product
    });

  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }
});


module.exports = router;
