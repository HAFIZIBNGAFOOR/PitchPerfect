const mongoose  = require('mongoose');
const Turf = new mongoose.Schema({
    turfName:{
        type:String,
        required:true
    },
    turfLocation:{
        long:String,
        lat:String,
        Address:String
    },
    turfImages:[String],
    facilities:[String],
    Slot:[String],
    turfContact:String,
    sportsType:String,
    sportsDimension:String,
    turfPrice:String
    
}) 
const turfModel = mongoose.model('Turf',Turf);
module.exports = turfModel;