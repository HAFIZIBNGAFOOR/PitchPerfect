const mongoose  = require('mongoose');
const formatDate = require('../helperFunctions/formatdate');
const cron = require('node-cron');

const Turf = new mongoose.Schema({
    turfName:{
        type:String,
        required:true
    },
    turfLocation:{
        long:String,
        lat:String,
        Address:String,
    },
    turfImages:{
       type: [String],
       required:true
    },
    turfOwner:{
        type:mongoose.Types.ObjectId,
        ref:'turfOwner',
        required:true
    },
    facilities:{
        type: [String],
     },
    status:{
        type:String,
        enum:['active','block'],
        default:'active',
    },
    slots:[
        {
            dateString:String,
            date:Date,
            timeSlots:[
                {
                    start:String,
                    end:String
                }
            ],
        }
    ],
    bookedSlots:[
        {
            dateString:String,
            date:Date,
            timeSlots:[
                {
                    start:String,
                    end:String
                }
            ],
        }
    ],
    addSlots:{
        type:Boolean,
    },
    turfContact:String,
    sportsType:String,
    sportsDimension:String,
    turfPrice:Number
    
})

const turfModel = mongoose.model('Turf',Turf);

module.exports = turfModel;