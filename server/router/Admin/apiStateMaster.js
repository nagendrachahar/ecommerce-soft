const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const verifyToken = require('../Utils/verifyToken');
const isAdmin = require('../Utils/isAdmin');
const user = require('../Utils/user');

// Require Branch model in our routes module
let State = require('../../model/masters/state.model');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

router.use(cors());

router.post('/api/SaveState', verifyToken("States"), function(req,res){
  
  if(isAdmin(res) || user.isSave(res)){
    let data = req.body;
    
    let state = new State(data);

    state.save().then(state => {

      res.status(200).json({
        resType: 'success',
        message: 'state successfully saved',
        state: state
      });
    })
    .catch(err => {
      res.status(200).json({
        resType: 'failed',
        message: 'Error in save'
      });
    });

  }
  else{
    res.status(200).json({
      resType: 'failed',
      message: 'you have no permission'
    });
  }
});


router.get('/api/getState', verifyToken("States"), function(req,res){
  if(isAdmin(res) || user.isView(res)){
    State.find(function(err, state){
      if(err){
        res.status(200).json({
          resType: 'failed',
          message: 'Error'
        });
      }
      else {
        res.status(200).json({
          resType: 'success',
          state: state
        });
      }
    });
  }
  else{
    res.status(200).json({
      resType: 'failed',
      message: 'you have no permission'
    });
  }
});

// Defined edit route
router.get('/api/getStateById/:id', verifyToken("States"), function (req, res) {
  if(isAdmin(res) || user.isView(res)){
    let id = req.params.id;
    State.findById(id, function (err, state){
      if(err){
        res.status(200).json({
          resType: 'failed',
          message: 'no data found'
        });
      }
      else {
        res.status(200).json({
          resType: 'success',
          message: '',
          state: state
        });
      }
    });
  }
  else{
    res.status(200).json({
      resType: 'failed',
      message: 'you have no permission'
    });
  }
  
});

//  Defined update route
router.post('/api/updateStateById/:id', verifyToken("States"), function (req, res) {
  if(isAdmin(res) || user.isUpdate(res)){
    State.findById(req.params.id, function(err, state) {
      if (!state){
        res.status(200).json({
          resType: 'failed',
          message: 'No data found'
        });
      }
      else {
        state.stateName = req.body.stateName;
  
        state.save().then(state => {
          res.status(200).json({
            resType: 'success',
            message: 'state updated',
            state: state
          });
        })
        .catch(err => {
          res.status(200).json({
            resType: 'failed',
            message: 'unable to update the database'
          });
        });
      }
    });
  }
  else{
    res.status(200).json({
      resType: 'failed',
      message: 'you have no permission'
    });
  }
 
});

router.delete('/api/deleteState/:id', verifyToken("States"), function(req,res){
  if(isAdmin(res) || user.isDelete(res)){
    State.findByIdAndRemove({_id: req.params.id}, function(err, state){
      if(err) res.status(200).json({
        resType: 'failed',
        message: 'unable to delete the state'
      });
      else res.json({
        resType: 'success',
        message: 'state removed',
        state: state
      });
    });
  }
  else{
    res.status(200).json({
      resType: 'failed',
      message: 'you have no permission'
    });
  }
  
});


router.get('/api/getStateDrop', verifyToken("States"), function(req,res){
  
  State.find({}, {_id: 1, stateName: 1}, function(err, state){
    if(err){
      res.status(200).json({
        resType: 'failed',
        message: 'Error'
      });
    }
    else {
      res.status(200).json({
        resType: 'success',
        state: state
      });
    }
  });
  
});

module.exports = router;
