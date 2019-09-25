const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Admin User permission
let Permission = new Schema({
  
  userId: {
    type: Schema.Types.ObjectId,
    ref: "AdminUser"
  },
  menuName: {
    type: String,
  },
  isView: {
    type: Boolean,
    default: false
  },
  isSave: {
    type: Boolean,
    default: false
  },
  isUpdate: {
    type: Boolean,
    default: false
  },
  isDelete: {
    type: Boolean,
    default: false
  },
  entryOn: {
    type: Date,
    required: true,
    default:Date.now
  },
  entryBy: {
    type: Schema.Types.ObjectId,
    ref: "AdminUser"
  }

},{
    collection: 'Permission'
});

module.exports = mongoose.model('Permission', Permission);