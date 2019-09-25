var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
var verifyToken = require('../Utils/verifyToken');
var isAdmin = require('../Utils/isAdmin');
var user = require('../Utils/user');

// Require Company model in our routes module
let Company = require('../../model/masters/company.model');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/wwwroot')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage });
router.use(cors());

router.post('/api/SaveCompany', verifyToken("Company"), upload.single('image'), async (req, res, next) => {
  
  if(isAdmin(res) || user.isSave(res)){
    let data = req.body;

    if(req.file){
      data["logoPath"] = req.file.filename;
    }
    else{
      data["logoPath"] = "";
    }
    
    let company = new Company(data);

    await company.save()

    res.status(200).json({
      resType: 'success',
      message: 'company successfully saved'
    });

  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }
});


router.get('/api/getCompany', verifyToken("Company"), async (req, res, next) => {
  if(isAdmin(res) || user.isView(res)){
    
    const company = await Company.find();

    res.status(200).json({
      resType: 'success',
      message: '',
      company: company
    });

  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }
});

// Defined edit route
router.get('/api/getCompanyById', verifyToken("Company"), async (req, res, next) => {
  if(isAdmin(res) || user.isView(res)){
    
    const company = await Company.findOne();

    res.status(200).json({
      resType: 'success',
      message: '',
      company: company
    });

  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }
  
});

//  Defined update route
router.post('/api/updateCompanyById/:id', verifyToken("Company"), upload.single('image'), async (req, res, next) => {
  if(isAdmin(res) || user.isUpdate(res)){

    const company = await Company.findById(req.params.id);

    company.companyName = req.body.companyName;
    company.email = req.body.email;
    company.contactNo = req.body.contactNo;
    company.Address = req.body.Address;
    if(req.file){
      company.logoPath = req.file.filename;
    }

    await company.save();

    res.status(200).json({
      resType: 'success',
      message: 'company updated'
    });

  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }
 
});


module.exports = router;
