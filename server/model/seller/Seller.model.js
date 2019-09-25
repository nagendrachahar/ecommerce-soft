const mongoose = require('mongoose');
const schema = mongoose.Schema;

let seller = new schema({
    sellerName:{
        type:String,
        required:true,
    },
    sellerPhone:{
        type:String,
        required:true,
    },
    sellerEmail:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    photoPath:{
        type:String,
    },
    stateId:{
        type: schema.Types.ObjectId,
        ref: "State"
    },
    cityId:{
        type: schema.Types.ObjectId,
        ref: "City"
    },
    pinCode:{
        type:Number
    },
    Address:{
        type:String
    },
    accountNo:{
        type:String
    },
    bankName:{
        type:String
    },
    ifscCode:{
        type:String
    },
},{
    collection: 'Seller'
});

module.exports = mongoose.model('Seller', seller)