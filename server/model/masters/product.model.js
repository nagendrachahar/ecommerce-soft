const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Product

let Product = new Schema({
  productName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  RevisedPrice: {
    type: Number
  },
  category1: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  category2: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  },
  brandId: {
    type: Schema.Types.ObjectId,
    ref: "Brand"
  },
  category3: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  },
  discription: {
    type: String
  },
  photoPath: {
    type: String
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
    required: true
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  approveBy: {
    type: Schema.Types.ObjectId,
    ref: "AdminUser",
  },
  entryOn: {
    type: Date,
    required: true,
    default:Date.now
  },
  updateOn: {
    type: Date,
    required: true,
    default:Date.now
  },

},{
    collection: 'Product'
});

module.exports = mongoose.model('Product', Product);