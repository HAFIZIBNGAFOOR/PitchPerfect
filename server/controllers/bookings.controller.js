const formatDate = require("../helperFunctions/formatdate");
const BookingModel = require("../model/bookings.model");
const TurfModel = require('../model/turf.model')
const UserModel = require('../model/user.model');
const RatingModel = require('../model/rating.model');
const dotenv = require('dotenv');
const { updateSlotWithExpiredDates } = require("./turf.controller");
const { convert12HourTo24Hour, convert12HourTo24HourNumber } = require("../helperFunctions/convertTIme");
const AdminModel = require("../model/admin.model");
const TurfAdmin = require("../model/turfAdmin.model");
dotenv.config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const bookingTurf = async(data, metadata,req,res)=>{
    try {
        const body = req.body
        const bookings =new BookingModel()
        const slots = JSON.parse(data.slotTiming)
        const date = formatDate(data.bookingDate);
        const turf = await TurfModel.findById(data.turf);
        const user = await UserModel.findById(data.userId);
        const dateIndex = turf.slots.findIndex((slot)=>slot.dateString === date);
        const slotToRemove = {
          end:slots.end,
          start:slots.start
        }
        const startRangeTime = convert12HourTo24HourNumber(slotToRemove.start)
        const endRangeTime = convert12HourTo24HourNumber(slotToRemove.end)
        if(dateIndex !== -1){
          const  bookedSlots = turf.slots[dateIndex].timeSlots.filter((slot)=>{
            return convert12HourTo24HourNumber(slot.start) >= startRangeTime &&convert12HourTo24HourNumber(slot.end) <= endRangeTime
          } )
          if(body && data && metadata && bookedSlots.length>0){
            bookings.user = data.userId,
            bookings.turf = data.turf,
            bookings.Time = new Date(),
            bookings.bookingId = body.id,
            bookings.bookedSlots ={
                slots : bookedSlots.map(slot=>({start:slot.start,end:slot.end})),
                date:new Date(data.bookingDate),
                dateString:data.bookingDate
            },
            bookings.paymentType = metadata.payment_method_types[0],
            bookings.totalCost = (metadata.amount/100);
            // await bookings.save();

            // updating with removing expired dates and times;

            updateSlotWithExpiredDates(data.turf);
            const dateIndex = turf.slots.findIndex((slot)=>slot.dateString === date);
            if(dateIndex !== -1){
              turf.slots[dateIndex].timeSlots = turf.slots[dateIndex].timeSlots.filter((slot)=>{
                return  convert12HourTo24HourNumber(slot.start) < startRangeTime || convert12HourTo24HourNumber(slot.end) > endRangeTime
              } )
              console.log(turf.slots[dateIndex],' turf slots in date index ');
              // await turf.save();
            } 
            const turfAdmin = await TurfAdmin.findOne({_id:turf.turfOwner});
            turfAdmin.wallet += (bookings.totalCost * 0.95);
            turfAdmin.walletStatements.push({ 
              turfName:turf.turfName,
              walletType:'credited from booking',
              amount:(bookings.totalCost * 0.95),
              user:user.userName,
              date:new Date(),
              transaction:'credit'
            });
            console.log(bookings.totalCost * 0.95,turfAdmin,' before turf admin saveeeeeee');
            await turfAdmin.save()

            let admin = await AdminModel.findOne({email:'pitchperfect@gmail.com'});
            admin.wallet += (bookings.totalCost * 0.05);
            admin.walletStatements.push({
              turfName:turf.turfName,
              walletType:'credited from booking',
              user:user.userName,
              amount:(bookings.totalCost * 0.05),
              date:new Date(),
              transaction:'credit'
            })
            console.log(admin.wallet,(bookings.totalCost * 0.05),admin.walletStatements,' vefore admin walett saveeeee ddddd');
            await admin.save()
            res.status(200).json({message:' sucsess'})
        }
        } res.status(404).json({message:'No data found'})
 
    } catch (error) {
        console.log(error,' this is error in booking');
        res.status(500).json({message:''})
    }
}
const checkoutSession = async(req,res)=>{
    try {
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
        const quantity =convert12HourTo24HourNumber(slots.end)- convert12HourTo24HourNumber(slots.start);
        console.log(quantity);
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
                  quantity:quantity,
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
          // console.log(customer.metadata,data,req,res);
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
    const booking = await BookingModel.findOne({_id:req.body.bookingId,bookingStatus:'Confirmed'}).populate('turf');
    const today = formatDate(new Date());
    let refundAmount = 0;
    if(booking){
      let refundPercentage=0;
      const bookingTime = new Date(`${booking.bookedSlots.dateString} ${booking.bookedSlots.slots.start}`);
      const currentTime = new Date().getTime()
      const timeDifference = bookingTime.getTime() - currentTime ;
      const hourDiff = timeDifference / (1000 * 60 * 60);
      console.log(hourDiff);
      if(hourDiff>24){
        refundPercentage = 100
      }else if(hourDiff >= 8 ){
        refundPercentage = 80
      }else if(hourDiff >= 6 ){
        refundPercentage = 75
      }else if(hourDiff >= 5 ){
        refundPercentage = 70
      }else if(hourDiff >= 4 ){
        refundPercentage = 60
      }else if(hourDiff >= 3 ){
        refundPercentage = 50
      }else refundPercentage = 0
       refundAmount = (refundPercentage / 100) * booking.totalCost;
      booking.bookingStatus = 'Cancelled';
      const user = await UserModel.findOne({ _id: booking.user });
      const admin = await AdminModel.findOne({email:'pitchperfect@gmail.com'})
      const turfAdmin = await TurfAdmin.findOne({_id:booking.turf.turfOwner})
    if (user && admin && turfAdmin) {
      const walletDetails = {
        turfName:booking.turf.turfName,
        walletType:'Refund from cancellation',
        amount:refundAmount,
        date:new Date(),
        transaction:'credit'
      }
      user.wallet += refundAmount;
      user.walletStatements.push(walletDetails);
      admin.wallet -= refundAmount * 0.05;
      admin.walletStatements.push({
        turfName:booking.turf.turfName,
        walletType:'Refund for cancellation of turf',
        amount:refundAmount * 0.05,
        date:new Date(),
        transaction:'debit'
      })
      turfAdmin.wallet-= refundAmount * 0.95
      turfAdmin.walletStatements.push({
        user:user.userName,
        turfName:booking.turf.turfName,
        walletType:'Refund for cancellation of turf',
        amount:refundAmount * 0.95,
        date:new Date(),
        transaction:'debit'
      })
      // await user.save();
    }
    // updating with removing expired dates and times;
    updateSlotWithExpiredDates(booking.turf);
    const slotToAdd = booking.bookedSlots.slots
    const turf = await TurfModel.findOne({ _id: booking.turf });
      if (turf) {
        const matchingIndex = turf.slots.findIndex((timeSlot) => timeSlot.dateString === booking.bookedSlots.dateString);
        console.log(matchingIndex);
        if (matchingIndex !== -1) {
          turf.slots[matchingIndex].timeSlots.push(...slotToAdd);
          // await turf.save();
        }
      }
      // await booking.save()
    } else{
      res.status(404).json({message:'No booking Found with provided id '})
    }
    const updatedUser = await UserModel.findOne({_id:booking.user})
    const updatedBooking = await BookingModel.findById(req.body.bookingId).populate('user').populate('turf')
    res.status(200).json({message:`Amount ${refundAmount}  will be refunded to your wallet soon`,status:true,updatedBooking})
  } catch (error) {
    console.log(error);
    res.status(500).json({message:'Internal server error '})
  }
}


const singleBooking = async(req,res)=>{
  try {
    console.log('inside single boooking ');
    const bookingId = req.params.bookingId
    const bookings =  await BookingModel.findById(bookingId).populate('user').populate('turf');
    const rating = await RatingModel.findOne({userId:req.id,turfId:bookings.turf._id});
      if (bookings) {
        if(rating)res.status(200).json({bookings,rating})
        else res.status(200).json({bookings})
      }else res.status(400).json({message:'No bookings found'})
  } catch (error) {
    console.log(error);
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

    // const bookedSlots = turfToUpdate.slots[dateIndex].timeSlots

    if(user.wallet >= amountToProceed){
      const turfToUpdate = await TurfModel.findById(req.body.turfId);
      const dateIndex = turfToUpdate.slots.findIndex((slot)=>slot.dateString === req.body.slot.dateString);
      if(dateIndex !== -1){
        const  bookedSlots = turf.slots[dateIndex].timeSlots.filter((slot)=>{
          const startTime = convert12HourTo24HourNumber(slot.start);
          const endTime = convert12HourTo24HourNumber(slot.end);
          const startRangeTime = convert12HourTo24HourNumber(slotToRemove.start)
          const endRangeTime = convert12HourTo24HourNumber(slotToRemove.end)
          return startTime >= startRangeTime && endTime <= endRangeTime
        } )
        const booking = new BookingModel();
        booking.turf = req.body.turfId;
        booking.user= req.id;
        booking.bookingId = `bid.${req.id}`
        booking.paymentType = 'Wallet';
        booking.bookedSlots = {
          date:new Date(req.body.slot.dateString),
          dateString:req.body.slot.dateString,
          slots : bookedSlots.map(slot=>({start:slot.start,end:slot.end})),
        };
        booking.totalCost = req.body.totalCost;
        booking.Time = new Date()
        await booking.save()
        user.wallet = user.wallet - amountToProceed
        const walletDetails = {
          turfName:turfToUpdate.turfName,
          walletType:'booked a turf',
          transaction:'debit',
          date:new Date(),
          amount:amountToProceed
        }
        user.walletStatements.push(walletDetails)
        await user.save()
        // updateSlotWithExpiredDates(req.body.turfId);
        const turf = await TurfModel.findById(req.body.turfId);
        const dateIndexToRemove = turf.slots.findIndex((slot)=>slot.dateString === date);
        if(dateIndexToRemove !== -1){
          turf.slots[dateIndexToRemove].timeSlots = turf.slots[dateIndex].timeSlots.filter((slot)=>{
            const startTime = convert12HourTo24HourNumber(slot.start);
            const endTime = convert12HourTo24HourNumber(slot.end);
            const startRangeTime = convert12HourTo24HourNumber(slotToRemove.start)
            const endRangeTime = convert12HourTo24HourNumber(slotToRemove.end)
            return startTime < startRangeTime || endTime > endRangeTime
          } )
          console.log(turf.slots[dateIndexToRemove].timeSlots,'after changing slots ');
          await turf.save();
        } 
      res.status(200).json({message:'successfully updated'})
      }
      
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