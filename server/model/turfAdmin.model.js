const mongoose = require('mongoose');

const turfAdminModel = new mongoose.Schema({
    turfAdminName:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})
const turfAdmin = mongoose.model("turfAdmin",turfAdminModel);
module.exports = turfAdmin;