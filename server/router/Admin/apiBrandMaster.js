var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const cors = require('cors');
const verifyToken = require('../Utils/verifyToken');
const isAdmin = require('../Utils/isAdmin');
const user = require('../Utils/user');

// Require Branch model in our routes module

const Brand = require('../../model/masters/brand.model');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

router.use(cors());

router.post('/api/SaveBrand', verifyToken("Brand"), async (req, res, next) => {
  
  if(isAdmin(res) || user.isSave(res)){

    let data = req.body;
    
    let brand = new Brand(data);

    await brand.save();

    res.status(200).json({
      resType: 'success',
      message: 'brand saved',
      brand: brand
    });

  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }
});

router.get('/api/getBrand', verifyToken("Brand"), async (req,res, next) => {
  if(isAdmin(res) || user.isView(res)){

    const brand = await Brand.find();

    res.status(200).json({
      resType: 'success',
      brand: brand
    });
      
  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }

});

// Defined edit route
router.get('/api/getBrandById/:id', verifyToken("Brand"), async (req, res, next) => {
  if(isAdmin(res) || user.isView(res)){
    let id = req.params.id;

    const brand = await Brand.findById(id);

    res.status(200).json({
      resType: 'success',
      message: '',
      brand: brand
    });

  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }
  
});

//  Defined update route
router.post('/api/updateBrandById/:id', verifyToken("Brand"), async (req, res, next) => {
  if(isAdmin(res) || user.isUpdate(res)){

    const brand = await Brand.findById(req.params.id);

    brand.brandName = req.body.brandName;

    await brand.save();

    res.status(200).json({
      resType: 'success',
      message: 'Brand updated',
      brand: brand
    });

  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }
 
});

router.delete('/api/deleteBrand/:id', verifyToken("Brand"), async (req, res, next) => {
  if(isAdmin(res)){
    
    const brand = await Brand.findByIdAndRemove({_id: req.params.id});
    
    res.status(200).json({
      resType: 'success',
      message: 'brand removed',
      brand: brand
    });

  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }

}); 

router.get('/api/getBrandDrop', verifyToken("None"), async (req,res, next) => {
 
    const brand = await Brand.find();

    res.status(200).json({
      resType: 'success',
      brand: brand
    });
      
});

module.exports = router;
