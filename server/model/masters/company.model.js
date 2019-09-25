const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for teacher company
let Company = new Schema({
  
  companyName: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required:true
  },
  contactNo: {
    type: String,
    required:true
  },
  Address: {
    type: String,
    required:true
  },
  logoPath: {
    type: String
  }

},{
    collection: 'Company'
});

module.exports = mongoose.model('Company', Company);