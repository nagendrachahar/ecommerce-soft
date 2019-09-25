const express = require('express'); 
const router = express.Router(); 
const bodyParser = require('body-parser'); 
const multer = require('multer');
const cors = require('cors'); 
var verifyToken = require('../Utils/verifyToken');
const isSeller = require('../Utils/isSeller')

// Require Branch model in our routes module 

const Customer = require('../../model/customer/Customer.model'); 

router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({extended:false})); 

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/wwwroot/Customer')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage });
router.use(cors());

router.post('/api/web/registerCustomer', async (req,res, next) => { 
  
  let data = req.body; 

  let customer = await Customer.findOne({Phone: String(req.body.Phone)}).exec()

  if(customer == null){
    customer = new Customer(data); 
    await customer.save(); 

    res.status(200).json({ 
      resType: 'success', 
      message: 'registration successfull! go for login', 
      customer: customer 
    }); 
  }
  else{
    req.status = 200;
    const error = new Error("already registered");
    next(error);
  }
  
}); 

router.get('/api/web/checkSession', verifyToken("none"), function(req,res){
  if(res.locals.decoded.userType === 'Customer'){ 
    res.status(200).json({ 
      resType: 'success', 
      message: 'wellcome', 
      userName: res.locals.decoded.userName 
    }); 
  } 
  else{ 
    req.status = 200; 
    const error = new Error("Failed to authenticate."); 
    next(error); 
  } 
    
}); 


module.exports = router;
