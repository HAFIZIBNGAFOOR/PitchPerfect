const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:true
    },
    amount:{
        type:Number,
        default:0
    },
})
const Wallet  = mongoose.model('Wallet', WalletSchema);
module.exports= Wallet