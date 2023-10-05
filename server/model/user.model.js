const mongoose = require('mongoose');

const UserModel = new mongoose.Schema({
    userName:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean
    },
    role:{
        type:String
    },
    phone:{
        required:true,
        type:Number
    },
    age:{
        type:Number
    },
    image:{
        type:String
    },
    isBlocked:{
        type:Boolean
    }
})
const User = mongoose.model('User',UserModel);
module.exports = User;