const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');
const config = require('../config');
const verifyToken = require('./Utils/verifyToken');
const isAdmin = require('./Utils/isAdmin');

const Admin = require('../model/adminUser.model');
const Seller = require('../model/seller/Seller.model');
const Customer = require('../model/customer/Customer.model'); 

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

router.post('/api/checkLogin', async (req,res, next) => {
    //var hashedPassword = bcrypt.hashSync(req.body.Password, 8);

    let userLogin = await Admin.findOne({UserCode: String(req.body.UserId), Password: String(req.body.Password)}).exec()
    let redirectTo = "/AdminHome";
    let userType = "Admin";
    let userCode = userLogin == null ? '' : userLogin.UserCode;

    if(userLogin == null){
      userLogin = await Seller.findOne({sellerPhone: String(req.body.UserId), password: String(req.body.Password)}).exec()
      redirectTo = "/SellerHome";
      userType = "Seller";
      userCode = userLogin == null ? '' : userLogin.sellerPhone;
    }

    console.log(userLogin);
    if(userLogin != null) {
      var token = jwt.sign(
        { id: userLogin._id, userType: userType, userCode: userCode }, 
        config.secret, 
        {
          expiresIn: '7d' // expires in 7 days
        });

      res.status(200).json({
          resType: 'success',
          token: token,
          redirectTo: redirectTo
      });

    }
    else{
      req.status = 200;
      const error = new Error("Failed to authenticate.");
      next(error);
    }
      
});

 
router.get('/api/checkSession', verifyToken("none"), function(req,res,next){
  if(isAdmin(res)){
    res.status(200).json({
      resType: 'success',
      message: 'wellcome'
    });
  }
  else{
    req.status = 200;
    const error = new Error("Failed to authenticate.");
    next(error);
  }
    
});


router.get('/api/checkSellerSession', verifyToken("none"), function(req,res, next){
  if(res.locals.decoded.userType === 'Seller'){
    res.status(200).json({
      resType: 'success',
      message: 'wellcome'
    });
  }
  else{
    req.status = 200;
    const error = new Error("Failed to authenticate.");
    next(error);
  }
    
});

router.post('/api/customerLogin', async (req,res, next) => {
  //var hashedPassword = bcrypt.hashSync(req.body.Password, 8);
  console.log(req.body)
  let userLogin = await Customer.findOne({Phone: String(req.body.UserId), password: String(req.body.Password)}).exec()
  let redirectTo = "/";
  let userType = "Customer";
  let userName = userLogin == null ? '' : userLogin.Name;

  console.log(userLogin);
  if(userLogin != null) {
    var token = jwt.sign(
      { id: userLogin._id, userType: userType, userName: userName }, 
      config.secret, 
      {
        expiresIn: '7d' // expires in 7 days
      });

    res.status(200).json({
        resType: 'success',
        token: token,
        redirectTo: redirectTo
    });

  }
  else{
    req.status = 200;
    const error = new Error("Failed to authenticate.");
    next(error);
  }
    
});


module.exports = router;
