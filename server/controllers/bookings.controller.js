const formatDate = require("../helperFunctions/formatdate");
const BookingModel = require("../model/bookings.model");
const TurfModel = require('../model/turf.model')
const UserModel = require('../model/user.model');
const dotenv = require('dotenv');
const { updateSlotWithExpiredDates } = require("./turf.controller");
dotenv.config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const bookingTurf = async(data, metadata,req,res)=>{
    try {
        const body = req.body
        const bookings =new BookingModel()
        const slot = JSON.parse(data.slotTiming)
        if(body && data && metadata){
            bookings.user = data.userId,
            bookings.turf = data.turf,
            bookings.Time = new Date(),
            bookings.bookingId = body.id,
            bookings.bookedSlots ={
                slots : slot,
                date:new Date(data.bookingDate),
                dateString:data.bookingDate
            },
            bookings.paymentType = metadata.payment_method_types[0],
            bookings.totalCost = (metadata.amount/100);
            await bookings.save();
            const date = formatDate(data.bookingDate);
            const slotToRemove = {
              end:slot.end,
              start:slot.start
            }
            console.log(slotToRemove,' this is the slots to remove',slot);
            // updating with removing expired dates and times;
            updateSlotWithExpiredDates(data.turf);
            const turf = await TurfModel.findById(data.turf);
            const dateIndex = turf.slots.findIndex((slot)=>slot.dateString === date);
            if(dateIndex !== -1){
              turf.slots[dateIndex].timeSlots = turf.slots[dateIndex].timeSlots.filter((slot)=>slotToRemove.start !==slot.start && slotToRemove.end !==slot.end )
              turf.bookedSlots.push({
                date:new Date(date),
                dateString:date,
                timeSlots:slotToRemove
              }) 
              await turf.save();
            } 
        }
    } catch (error) {
        res.status(500).json({message:''})
    }
}
const checkoutSession = async(req,res)=>{
    try {
        updateSlotWithExpiredDates(req.body.turfId)
        const turf = await TurfModel.findById(req.body.turfId)
        const slots = req.body.selectedSlots.slots
        const customer = await stripe.customers.create({
            metadata:{
                userId:req.id,
                turf:req.body.turfId,
                bookingDate:req.body.selectedSlots.date,
                slotTiming:JSON.stringify(slots)
            }
        })
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            line_items: [
                {
                  price_data: {
                    currency: 'inr',
                    product_data: {
                      name: turf.turfName,
                    },
                    unit_amount: turf.turfPrice * 100,
                  },
                  quantity:1,
                },
            ],
            customer:customer.id,
            mode:'payment',
            success_url:`http://localhost:4200/booking-success`,
            cancel_url:`http://localhost:4200/booking-failed`,
        })
        res.status(200).json({id:session.id})
    } catch (error) {
        res.status(500).json({message:'internal server error'})
    }
}
const webhooks = async(req,res)=>{
    let endpointSecret;
    const payload = req.body;
    const sig = req.headers['stripe-signature'];
    let data;
    let eventType;
    if(endpointSecret){
      let event;
      try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
      } catch (err) {
        res.status(400).json({success:true});
        return;
      }
    }else{
        data = req.body.data.object;
        eventType=req.body.type
      if(eventType === "payment_intent.succeeded"){
        stripe.customers.retrieve(data.customer).then((customer)=>{
            bookingTurf(customer.metadata, data, req,res);
        })
      }
    }
  }

const bookingDetails = async(req,res)=>{
  try {
    const userId = req.id;
    if(userId){
      const bookings = await BookingModel.find({user:userId}).populate('turf').populate('user');
        if(bookings && bookings.length>0){
          bookings.forEach(async(booking)=>{
            if(booking.bookedSlots && booking.bookedSlots.slots.end && booking.bookedSlots.dateString && booking.bookingStatus==='Confirmed'){
              const currentDate = new Date()
              const bookingEndDate = new Date(`${booking.bookedSlots.dateString} ${currentDate.toISOString().split('T')[1]}`);
              if( bookingEndDate < currentDate ){
                 booking.bookingStatus = 'Completed'
              };
              if(formatDate(currentDate)== booking.bookedSlots.dateString){
                const currentTime  = currentDate.getHours();
                if(currentTime >= new Date(`${booking.bookedSlots.dateString} ${booking.bookedSlots.slots.start}`).getHours()){
                  booking.bookingStatus = 'Completed'
                }
              }
              await booking.save()
            }
          })
          res.status(200).json({bookings})
        }else res.status(401).json({message:'No bookings found'})
    }
  } catch (error) {
    res.status(500).json({message:'internal server error '});
  }
}

const cancelBooking = async(req,res)=>{
  try {
    console.log(req.body,);
    const booking = await BookingModel.findOne({_id:req.body.bookingId,bookingStatus:'Confirmed'});
    const today = formatDate(new Date());
    let refundAmount = 0;
    if(booking){
      let refundPercentage=0;
      const bookingTime = new Date(`${booking.bookedSlots.dateString} ${booking.bookedSlots.slots.start}`);
      const currentTime = new Date().getTime()
      const timeDifference = bookingTime.getTime() - currentTime ;
      const hourDiff = timeDifference / (1000 * 60 * 60);
      if(hourDiff>24){
        refundPercentage = 100
      }else if(hourDiff >= 8 ){
        refundPercentage = 80
      }else if(hourDiff >= 6 ){
        refundPercentage = 75
      }else if(hourDiff >= 5 ){
        refundPercentage = 70
      }else if(hourDiff >= 4 ){
        refundPercentage = 65
      }else if(hourDiff >= 3 ){
        refundPercentage = 60
      }else if(hourDiff >= 1){
        refundPercentage = 50
      }else refundPercentage = 0
       refundAmount = (refundPercentage / 100) * booking.totalCost;
      booking.bookingStatus = 'Cancelled';
      const user = await UserModel.findOne({ _id: booking.user });
    if (user) {
      user.wallet += refundAmount;
      await user.save();
    }
    // updating with removing expired dates and times;
    updateSlotWithExpiredDates(booking.turf);
    const turf = await TurfModel.findOne({ _id: booking.turf });
      if (turf) {
        const matchingIndex = turf.slots.findIndex(
          (timeSlot) => timeSlot.dateString === booking.bookedSlots.dateString
        )
        if (matchingIndex !== -1) {
          const slotToAdd = {
            start: booking.bookedSlots.slots.start,
            end: booking.bookedSlots.slots.end
          };
          turf.timeSlot[matchingIndex].slots.push(slotToAdd);
          await turf.save();
        }
      }
      await booking.save()
    } else{
      res.status(404).json({message:'No booking Found with provided id '})
    }
    const updatedUser = await UserModel.findOne({_id:booking.user})
    const updatedBooking = await BookingModel.findById(req.body.bookingId).populate('user').populate('turf')
    res.status(200).json({message:`Amount ${refundAmount}  will be refunded to your wallet soon`,status:true,updatedBooking})
  } catch (error) {
    res.status(500).json({message:'Internal server error '})
  }
}
const singleBooking = async(req,res)=>{
  try {
    const bookingId = req.params.bookingId
    const bookings =  await BookingModel.findById(bookingId).populate('user').populate('turf');
    if (bookings) res.status(200).json({bookings})
    else res.status(400).json({message:'No bookings found'})
  } catch (error) {
    res.status(500).json({message:'internal server error '})
  }
}
const updateSlots = async(req,res)=>{
  try {
    const bookings = await BookingModel.findById(req.body.bookingId);
    if(bookings){
      const timeSlot = req.body.newSlot;
      const previousSlot = JSON.parse(JSON.stringify(bookings.bookedSlots));
      bookings.bookedSlots = {
        date:timeSlot.date,
        dateString:timeSlot.dateString,
        slots:{start: timeSlot.timeSlots.start, end:timeSlot.timeSlots.end}
      }
      
      // updating with removing expired slots 
      updateSlotWithExpiredDates(bookings.turf)
      const turf = await TurfModel.findById(bookings.turf)
      const index = turf.slots.findIndex(slot=>slot.dateString == previousSlot.dateString );
      //adding previous slot back to slots and removing from booked slots
      if(index !== -1){
        turf.slots[index].timeSlots.push({
          start:previousSlot.slots.start,
          end:previousSlot.slots.end
      }) 
      }else {
          turf.slots.push({
          timeSlots:{
            start:previousSlot.slots.start,
            end:previousSlot.slots.end
          },
          date:previousSlot.date,
          dateString:previousSlot.dateString
        })
      }
      const toRemoveIndex = turf.bookedSlots.findIndex((slot)=>slot.dateString == previousSlot.dateString);
      if(toRemoveIndex !== -1){
        const newSlots = turf.bookedSlots[toRemoveIndex].timeSlots.filter((slot)=>slot.end !== previousSlot.slots.end && slot.start !== previousSlot.slots.start )
        turf.bookedSlots[toRemoveIndex].timeSlots= newSlots.map(slot=>({start:slot.start,end:slot.end}))
      }   
      //removing new added slots from slots and adding to booked slots 
      const indexToAdd = turf.slots.findIndex(slot=>slot.dateString == timeSlot.dateString);
      if(indexToAdd!== -1){
        const newSlots = turf.slots[indexToAdd].timeSlots.filter(slot=>slot.end !==timeSlot.timeSlots.end && slot.start !==timeSlot.timeSlots.start)
        const mappedSlots = newSlots.map(slot=>({start:slot.start,end:slot.end}))
       turf.slots[indexToAdd].timeSlots = newSlots.map(slot=>({start:slot.start,end:slot.end}))
      }
      const toAddIndex = turf.bookedSlots.findIndex(slot=>slot.dateString == timeSlot.dateString);
      if(toAddIndex !== -1){
         turf.bookedSlots[toAddIndex].timeSlots.push({start:timeSlot.timeSlots.start,end:timeSlot.timeSlots.end})
      }else{
        const newBooking = {
          timeSlots:{
            start:timeSlot.timeSlots.start,
            end:timeSlot.timeSlots.end
          },
          date:timeSlot.date,
          dateString:timeSlot.dateString
        }
        turf.bookedSlots.push(newBooking)
      }
      await turf.save()
      await bookings.save()
      res.status(200).json({message:'sucessfully updated slots '})
    }else res.status(404).json({message:'No bookings found '})

  } catch (error) {
    res.status(500).json({message:'Internal server error '})
  }
}

const getTurfLocation = async(req,res)=>{
  try {
    const turf = await TurfModel.findById(req.params.turfId);
    if(turf) res.status(200).json({location:{long:parseFloat(turf.turfLocation.long),lat:parseFloat(turf.turfLocation.lat)},turf:turf.turfName})
    else res.status(400).json({message:'Turf not exits '})
  } catch (error) {
    console.log(error);
  }
}
const checkWalletAndBook = async(req,res)=>{
  try {
    const turf  = await TurfModel.findById(req.body.turfId);
    const slotToRemove = req.body.slot.slots
    const amountToProceed = turf.turfPrice
    const user = await UserModel.findById({_id:req.id});
    if(user.wallet >= amountToProceed){
      const booking = new BookingModel();
      booking.turf = req.body.turfId;
      booking.user= req.id;
      booking.bookingId = `bid${turf._id}${req.id}`
      booking.paymentType = 'Wallet';
      booking.bookedSlots = {
        date:new Date(req.body.slot.date),
        dateString:formatDate(req.body.slot.date),
        slots:{start:slotToRemove.start,end:slotToRemove.end}
      };
      booking.totalCost = amountToProceed;
      booking.Time = new Date()
      await booking.save()
      user.wallet = user.wallet - amountToProceed
      await user.save()
      // updateSlotWithExpiredDates(req.body.turfId);
      const turfToUpdate = await TurfModel.findById(req.body.turfId);
      const dateIndex = turfToUpdate.slots.findIndex((slot)=>slot.dateString === req.body.slot.dateString);
      if(dateIndex !== -1){
        turfToUpdate.slots[dateIndex].timeSlots = turfToUpdate.slots[dateIndex].timeSlots.filter((slot)=>slotToRemove.start !==slot.start && slotToRemove.end !==slot.end )
        const dateIndexOfBookedSlots = turf.bookedSlots.findIndex(slot=>slot.dateString === req.body.slot.dateString);
        if(dateIndexOfBookedSlots!== -1){
          turfToUpdate.bookedSlots[dateIndexOfBookedSlots].timeSlots = slotToRemove
        }else {
          turfToUpdate.bookedSlots.push({
            date:new Date(req.body.slot.date),
            dateString:req.body.slot.dateString,
            timeSlots:{start:slotToRemove.start, end:slotToRemove.end}
          }) 
        }
        await turfToUpdate.save();
      } 
      res.status(200).json({message:'successfully updated'})
    }else res.status(402).json({message:'not enough wallet amount'})
  } catch (error) {
    res.status(500).json({message:'Internal server error '})
  }
}

const getFullTurfDetails = async(req,res)=>{
  try {
    const bookingDetails = await BookingModel.find().populate('turf').populate('user');
    if(bookingDetails) res.status(200).json({bookingDetails});
    else res.status(404).json({message:'no bookings not found'})
  } catch (error) {
    res.status(500).json({message:'Internal server error'})
  }
}
module.exports={
    bookingTurf,
    webhooks,
    checkoutSession,
    bookingDetails,
    cancelBooking,
    singleBooking,
    updateSlots,
    getTurfLocation,
    getFullTurfDetails,
    checkWalletAndBook
}