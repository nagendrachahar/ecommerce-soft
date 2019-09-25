var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const cors = require('cors');
const verifyToken = require('../Utils/verifyToken');
const isAdmin = require('../Utils/isAdmin');
const user = require('../Utils/user');

// Require Branch model in our routes module

const City = require('../../model/masters/city.model');
let State = require('../../model/masters/state.model');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

router.use(cors());

router.post('/api/SaveCity', verifyToken("City"), async (req,res, next) => {
  
  if(isAdmin(res)){

    let data = req.body;
    const state = await State.findOne({_id:data.stateId});

    data.stateId=state._id;
    
    let city = new City(data);

    await city.save();

    res.status(200).json({
      resType: 'success',
      message: 'city saved',
      city:city
    });

  }
  else if(user.isSave(res)){
    
    let data = req.body;
    const state = await State.findOne({_id:data.stateId});

    data.stateId=state._id;
    
    let city = new City(data);

    await city.save();

    res.status(200).json({
      resType: 'success',
      message: 'city saved',
      city:city
    });

  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }
});

router.get('/api/getCity', verifyToken("City"), async (req,res, next) => {
  if(isAdmin(res)){

    const city = await City.find().populate('stateId').exec();

      res.status(200).json({
        resType: 'success',
        city: city
      });
      
  }
  else if(user.isView(res)){

    const city = await City.find().populate('stateId').exec();

      res.status(200).json({
        resType: 'success',
        city: city
      });
      
  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
   }
});

// Defined edit route
router.get('/api/getCityById/:id', verifyToken("City"), async (req, res, next) => {
  if(isAdmin(res)){
    let id = req.params.id;

    const city = await City.findById(id);

    res.status(200).json({
      resType: 'success',
      message: '',
      city: city
    });

  }
  else  if(user.isView(res)){
    let id = req.params.id;

    const city = await City.findById(id);

    res.status(200).json({
      resType: 'success',
      message: '',
      city: city
    });

  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }
  
});

//  Defined update route
router.post('/api/updateCityById/:id', verifyToken("City"), async (req, res, next) => {
  if(isAdmin(res)){

    const city = await City.findById(req.params.id);

    city.stateId = req.body.stateId;
    city.cityName = req.body.cityName;

    await city.save();

    res.status(200).json({
      resType: 'success',
      message: 'city updated',
      city: city
    });

  }
  else if(user.isUpdate(res)){

    const city = await City.findById(req.params.id);

    city.stateId = req.body.stateId;
    city.cityName = req.body.cityName;

    await city.save();

    res.status(200).json({
      resType: 'success',
      message: 'city updated',
      city: city
    });

  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }
 
});

router.delete('/api/deleteCity/:id', verifyToken("City"), async (req, res, next) => {
  if(isAdmin(res)){
    
    const city = await City.findByIdAndRemove({_id: req.params.id});
    
    res.status(200).json({
      resType: 'success',
      message: 'city removed',
      city: city
    });

  }
  else if(user.isDelete(res)){
    
    const city = await City.findByIdAndRemove({_id: req.params.id});
    
    res.status(200).json({
      resType: 'success',
      message: 'city removed',
      city: city
    });

  }
  else{
    req.status = 200;
    const error = new Error("you have no permission.");
    next(error);
  }
});

// get city list by stateid
router.get('/api/getCityByStateId/:id', verifyToken("City"), async (req, res, next) => {
  
    let id = req.params.id;
    const city = await City.find({ stateId: id},{'_id': 1, 'cityName': 1});

    res.status(200).json({
      resType: 'success',
      message: '',
      city: city
    });

});

module.exports = router;
