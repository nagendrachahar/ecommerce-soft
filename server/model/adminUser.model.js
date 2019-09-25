const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let AdminLogin = new Schema({
  UserCode: {
    type: String
  },
  Password: {
    type: String
  }
},{
    collection: 'AdminUser'
});

module.exports = mongoose.model('AdminLogin', AdminLogin);