const mongoose = require('mongoose');
const adminModel =new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
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
const AdminModel = mongoose.model('Admin', adminModel)
module.exports = AdminModel;