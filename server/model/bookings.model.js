const mongoose = require('mongoose');

const BookingsSchema = new mongoose.Schema({
    bookingId:{
        type:String,
        required:true,           
    },
    turf:{
        type:mongoose.Types.ObjectId,
        ref:'Turf',
        required:true
    },
    totalCost:{
        type:Number,
        required:true
    },
    discount:Number,
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    Time:{
        type:Date,
        required:true,
    },
    bookedSlots:{
        dateString:String,
        date:Date,
        slots:[{
            start:String,
            end:String,
        }]
    },
    paymentType:{
        required:true,
        type:String
    },
    bookingStatus:{
        type:String,
        enum:['Confirmed','Completed','Cancelled'],
        default:'Confirmed'
    }
});

const Bookings = mongoose.model('Bookings',BookingsSchema)

module.exports = Bookings;
