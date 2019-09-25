const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const objectID = require('mongodb').ObjectID
const verifyToken = require('../Utils/verifyToken');
const isAdmin = require('../Utils/isAdmin');
const user = require('../Utils/user');

// Require Category model in our routes module

const Category = require('../../model/masters/category.model'); 

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

router.use(cors());

router.post('/api/SaveCategory', verifyToken("Category"), async (req,res, next) => {
  
  if(isAdmin(res) || user.isSave(res)){

    let data = req.body;
    
    let category = new Category(data);

    await category.save();

    res.status(200).json({ 
      resType: 'success', 
      message: 'category saved', 
      category: category 
    });

  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }
});

router.get('/api/getCategoryList', verifyToken("Category"), async (req,res, next) => {
  if(isAdmin(res) || user.isView(res)){

    const category = await Category.find().exec();

      res.status(200).json({
        resType: 'success',
        category: category
      });
      
  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
   }
});

// Defined edit route
router.get('/api/getCategoryById/:id', verifyToken("Category"), async (req, res, next) => {
  if(isAdmin(res) || user.isView(res)){
    let id = req.params.id;

    const category = await Category.findById(id);

    res.status(200).json({
      resType: 'success',
      message: '',
      category: category
    });

  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }
  
});

//  Defined update route
router.post('/api/updateCategoryById/:id', verifyToken("Category"), async (req, res, next) => {
  if(isAdmin(res) || user.isUpdate(res)){

    const category = await Category.findById(req.params.id);

    category.parentCategory = req.body.parentCategory;
    category.categoryName = req.body.categoryName;

    await category.save();

    res.status(200).json({
      resType: 'success',
      message: 'category updated',
      category: category
    });

  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }
 
});

router.delete('/api/deleteCategory/:id',verifyToken("Category"), async (req, res, next) => {
  if(isAdmin(res) || user.isDelete(res)){
    
    const category = await Category.findByIdAndRemove({_id: req.params.id});
    
    res.status(200).json({
      resType: 'success',
      message: 'category removed',
      category: category
    });

  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }
});

// get category list by stateid
router.get('/api/getCategoryByParentId/:id', verifyToken("Category"), async (req, res, next) => {
  
    let id = req.params.id;
    const category = await Category.find({ parentCategory: id});

    res.status(200).json({
      resType: 'success',
      message: '',
      category: category
    });

});


// get category list by stateid
router.get('/api/getCategoryDrop/:id', verifyToken("Category"), async (req, res, next) => {
  let id = req.params.id;
  let filter = {}
  if(objectID.isValid(id)){
    filter["parentCategory"] = id
  }
  
  const category = await Category.find(filter);

  res.status(200).json({
    resType: 'success',
    message: '',
    category: category
  });

});

module.exports = router;
