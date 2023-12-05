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
    isVerified:{
        type:Boolean,
        default:false
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    wallet:{
        type:Number,
        default:0
    },
    walletStatements:[
        {
        date:Date,
        walletType:String,
        amount:Number,
        user:String,
        turfName:{
            type:mongoose.Types.ObjectId,
            ref:'Turf',
            required:true
        },
        transaction:{
            type:String,
            enum:['debit','credit']
            }
        }
    ]
})
const turfAdmin = mongoose.model("turfAdmin",turfAdminModel);
module.exports = turfAdmin;