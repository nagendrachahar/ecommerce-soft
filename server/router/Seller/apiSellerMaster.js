const express = require('express'); 
const router = express.Router(); 
const bodyParser = require('body-parser'); 
const multer = require('multer');
const cors = require('cors'); 
var verifyToken = require('../Utils/verifyToken');
const isSeller = require('../Utils/isSeller')

// Require Branch model in our routes module 

const Seller = require('../../model/seller/Seller.model'); 

router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({extended:false})); 

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/wwwroot/Seller')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage });
router.use(cors());

router.post('/api/registerSeller', async (req,res, next) => { 
  
  let data = req.body; 
  
  let seller = new Seller(data); 

  await seller.save(); 

  res.status(200).json({ 
    resType: 'success', 
    message: 'seller saved', 
    seller: seller 
  }); 
 
}); 

router.get('/api/getSellerDetail',verifyToken("none"), async (req,res, next) => { 
  
  if(isSeller(res)){
    const {id} = res.locals.decoded
    const seller = await Seller.findById(id);

    res.status(200).json({
      resType: 'success',
      message: '',
      seller: seller
    });

  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }
 
}); 

router.post('/api/updateSellerProfile', verifyToken("none"), upload.single('image'), async (req, res, next) => {
  if(isSeller(res)){

    const {id} = res.locals.decoded;
    const seller = await Seller.findById(id);

    seller.sellerName = req.body.sellerName;
    seller.sellerPhone = req.body.sellerPhone;
    seller.sellerEmail = req.body.sellerEmail;
    seller.password = req.body.password;
    seller.stateId = req.body.stateId;
    seller.cityId = req.body.cityId;
    seller.pinCode = req.body.pinCode;
    seller.Address = req.body.Address;
    seller.accountNo = req.body.accountNo;
    seller.bankName = req.body.bankName;
    seller.ifscCode = req.body.ifscCode;
 
    if(req.file){
      seller.photoPath = req.file.filename;
    }

    await seller.save();

    res.status(200).json({
      resType: 'success',
      message: 'profile updated'
    });

  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }
 
});

module.exports = router;
