const mongoose = require('mongoose');

const Rating = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    turfId:{
        type:mongoose.Types.ObjectId,
        ref:'Turf',
        required:true
    }
})