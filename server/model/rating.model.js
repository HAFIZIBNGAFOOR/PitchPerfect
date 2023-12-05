const mongoose = require('mongoose');

const RatingSchema  = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    turfId:{
        type:mongoose.Types.ObjectId,
        ref:'Turf',
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    message:{
        type:String,
    },
    time:{
        // default:new Date()
        required:true,
        type:Date
    }
})
const Rating = mongoose.model('Rating',RatingSchema);
module.exports = Rating;