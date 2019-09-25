const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Category
let Category = new Schema({
  parentCategory: {
    type: String,
  },
  categoryName: {
    type: String,
    required: true
  }
},{
    collection: 'Category'
});

module.exports = mongoose.model('Category', Category);