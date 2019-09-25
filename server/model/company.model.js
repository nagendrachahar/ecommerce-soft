const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Company = new Schema({
  Logo: {
    type: String
  },
  companyName: {
    type: String
  },
  email: {
    type: String
  },
  contactNo: {
    type: String
  },
  Address: {
    type: String
  }
},{
    collection: 'Company'
});

module.exports = mongoose.model('Company', Company);