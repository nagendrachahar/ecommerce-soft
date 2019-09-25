const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const verifyToken = require('../Utils/verifyToken');
const isAdmin = require('../Utils/isAdmin');
const isSeller = require('../Utils/isSeller');

// Require Branch model in our routes module
const AdminUser = require('../../model/adminUser.model');
const AdminMenu = require('../../model/adminMenu.model');
const SellerMenu = require('../../model/seller/sellerMenu.model');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

// Defined edit route
router.get('/api/getAdminMenu', verifyToken("Admin Home"), async (req, res, next) => {
  if(isAdmin(res)){

    const adminMenu = await AdminMenu.find();
    
    res.status(200).json({
      resType: 'success',
      message: 'hiii',
      Menu: adminMenu
    });

  }
  else if(res.locals.decoded.userType === 'adminUser'){
    
    const adminUser = await AdminUser.findOne({_id:res.locals.decoded.id});

    const adminMenu = await AdminMenu.aggregate([
      {
        $lookup: {
          from: 'Permission',
          let: { menuName: '$title' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$menuName', '$$menuName'] },
                    { $eq: ['$isView', true] },
                    { $eq: ['$userId', adminUser._id] },
                  ]
                }
              }
            }
          ],
          as: "userPermission"
        }
      },
      { $unwind:"$userPermission" },
    ])
    
    res.status(200).json({
      resType: 'success',
      message: 'hii',
      Menu: adminMenu
    });

  }
  else if(isSeller(res)){
    const sellerMenu = await SellerMenu.find();
    
    res.status(200).json({
      resType: 'success',
      message: 'hiii',
      Menu: sellerMenu
    });
  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }
  
});

module.exports = router;