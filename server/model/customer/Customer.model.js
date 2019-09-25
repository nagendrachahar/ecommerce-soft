const mongoose = require('mongoose');
const schema = mongoose.Schema;

let customer = new schema({

    Name:{
        type:String,
        required:true,
    },
    Phone:{
        type:String,
        required:true,
    },
    Email:{
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
    }
},{
    collection: 'customer'
});

module.exports = mongoose.model('Customer', customer)