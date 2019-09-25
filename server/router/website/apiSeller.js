const express = require('express'); 
const router = express.Router(); 
const bodyParser = require('body-parser'); 
const multer = require('multer');
const cors = require('cors'); 
// const verifyToken = require('../Utils/verifyToken'); 
// const isSeller = require('../Utils/isSeller'); 

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

router.get('/api/web/getSeller', async (req,res, next) => { 
  
  const seller = await Seller.find({}, '_id sellerName photoPath Address cityId stateId').populate("stateId cityId");

  res.status(200).json({
    resType: 'success',
    message: '',
    seller: seller
  });

}); 

module.exports = router;
