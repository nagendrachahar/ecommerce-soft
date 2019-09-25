const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Cart
let Cart = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "customer",
    required: true
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },

},{
    collection: 'Cart'
});

module.exports = mongoose.model('Cart', Cart);