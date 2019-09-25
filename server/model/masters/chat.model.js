const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Chat

let Chat = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: true
  },
  message: {
    type: String,
    required: true
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: true
  },
  entryOn: {
    type: Date,
    required: true,
    default:Date.now
  }

},{
    collection: 'Chat'
});

module.exports = mongoose.model('Chat', Chat);