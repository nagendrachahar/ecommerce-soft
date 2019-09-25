var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
var verifyToken = require('../Utils/verifyToken');
const isAdmin = require('../Utils/isAdmin');
const user = require('../Utils/user');

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

router.get('/api/getPriceReviseList', verifyToken("Price Revise"), async (req, res, next) => {
  if(isAdmin(res) || user.isView(res)){
    const {id} = res.locals.decoded
    const product = await Product.find();

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
router.get('/api/getProductByIdForPriceRevise/:id', verifyToken("Price Revise"), async (req, res, next) => {
  if(isAdmin(res) || user.isView(res)){
    
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
router.post('/api/reviseProductPriseById/:id', verifyToken("Price Revise"), upload.single('image'), async (req, res, next) => {
  if(isAdmin(res) || user.isSave(res)){

    const {id} = res.locals.decoded
    const product = await Product.findById(req.params.id);

    delete product['updateOn'];

    product.productName = req.body.productName;
    product.price = req.body.price;
    product.RevisedPrice = req.body.RevisedPrice;
    product.category1 = req.body.category1;
    product.category2 = req.body.category2;
    product.category3 = req.body.category3;
    product.discription = req.body.discription;
    product.isApproved = req.body.isApproved;
    
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


module.exports = router;
