const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Brand
let Brand = new Schema({
  brandName: {
    type: String,
    required: true
  }
},{
    collection: 'Brand'
});

module.exports = mongoose.model('Brand', Brand);