const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Seller Menu
let sellerMenu = new Schema({
  parentId: {
    type: String
  },
  icon: {
    type: String
  },
  Name: {
    type: String
  },
  url: {
    type: String
  }
},{
    collection: 'SellerMenu'
});

module.exports = mongoose.model('SellerMenu', sellerMenu);