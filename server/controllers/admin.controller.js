// const hashPassword = require("../helperFunctions/hashpassword");
const AdminModel = require("../model/admin.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const TurfAdmin = require('../model/turfAdmin.model');
const SportsModel = require("../model/sports.model");
const Bookings = require("../model/bookings.model");
const Turf = require('../model/turf.model')
const formatDate = require("../helperFunctions/formatdate");


const adminLogin = async(req,res)=>{
    try {
        const {email, password} = req.body;
        const admin = await AdminModel.findOne({email});
        if(admin){
            const passMatch = bcrypt.compareSync(password,admin.password);
            if(passMatch){
                const payload = { email:admin.email,id:admin._id} 
                const token = jwt.sign(payload,process.env.ADMINJWT_SECRET,{expiresIn:"1d"});
                res.status(200).json({message:"adminlogin successfull", token:token});
            }else res.status(400).json({message:"Incorrect password"});
        }else res.status(401).json({message:"Is not an Admin ",status:'not admin'});
    } catch (error) {
        res.status(500).json({message:"internal server error "})
    }
}

const getDashboardDetails=async(req,res)=>{
    try {
        const bookings = await Bookings.find({bookingStatus:'Completed'}).populate('turf');
        const annualBookings = bookings.filter(booking=>new Date(booking.bookedSlots.date).getFullYear()== new Date().getFullYear() ) ;     
        let annualSales = 0;
        annualBookings.forEach(booking=>annualSales+= booking.totalCost);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const monthlyBookings = bookings.filter(booking => new Date(booking.bookedSlots.date) >= thirtyDaysAgo)
        let monthlySales = 0;
        monthlyBookings.forEach(booking=>monthlySales += booking.totalCost)
        // console.log(annualBookings,annualSales,monthlySales,monthlyBookings);
        const today = new Date();
        const currentDay = today.getDay();
        const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1);

        console.log(diff,' this islast week date ',new Date(today.setDate(diff)),currentDay,'  ');
        const weeklyBookings = bookings.filter(booking =>  new Date(today.setDate(diff + 6)) < new Date(booking.bookedSlots.date) < new Date(today.setDate(diff)));
        let weeklySales = 0 
        weeklyBookings.forEach(booking =>weeklySales += booking.totalCost )
        console.log(weeklyBookings,' this is weekly ',weeklySales);

        let bookingsByMonth = {};
        let noOfBookings =0;
        let TotalAmount= 0 
        const currentYear = new Date().getFullYear();
        for(let month=1 ;month<=12;month++){
            bookingsByMonth[`${currentYear}-${month}`]={month:`${currentYear}-${month}`,noOfBookings:0,TotalAmount:0} 
        }
        bookings.forEach(booking=>{
            if(booking.bookingStatus =='Completed'){
                const bookingYear = booking.Time.getFullYear();
                if(currentYear ==bookingYear){
                    const month = booking.Time.getMonth()+1;
                    const key = `${bookingYear}-${month}`
                    if(!bookingsByMonth[key]){
                        bookingsByMonth[key] = {month:key, noOfBookings,TotalAmount}
                    }
                    bookingsByMonth[key].noOfBookings++
                    bookingsByMonth[key].TotalAmount += booking.totalCost
                }
            }
        })

        // pie chart based on the types of sports booked\
        let sportsCount = {}
        const sports = await SportsModel.find();
        sports.forEach((sport)=>{
            sportsCount[sport.sportsName]={sports:sport.sportsName,count:0}
        })
        bookings.forEach(booking=>{
            let count =0
            if(!sportsCount[booking.turf.sportsType]) sportsCount[booking.turf.sportsType]={sports:booking.turf.sportsType,count}   
            sportsCount[booking.turf.sportsType].count++
        })
        res.status(200).json({monthlyBooking:Object.values(bookingsByMonth),weeklySales,monthlySales,annualSales,sportsTypeCount:Object.values(sportsCount)})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'error fetching user'})
    }
}

const usersDetails = async(req,res)=>{
    try {
        const users =await  User.find({});
        res.status(200).json({users})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}

const blockOrUnblock=async(req,res)=>{
    try {
        const user = await User.findOne({_id:req.body.userId});
        if(user.isBlocked == true){
          user.isBlocked = false;
          await user.save() 
        }else{
            user.isBlocked=true;
            await user.save()
        }
        const updatedCollection = await User.find();
        res.status(200).json({message:'user blocked successfully',users:updatedCollection})
    } catch (error) {
        res.status(500).json({message:'internal server error'})
    }
}

const getTurfAdminDetails = async(req,res)=>{
    try {
        const turfAdminData = await TurfAdmin.find({})
        res.status(200).json({message:'turf admin data fetched ',turfAdminData})
    } catch (error) {
        res.status(500).json({message:'internal server error '})
    }
}

const verifyTurfAdmin = async(req,res)=>{
    try {
        const turfAdmin = await TurfAdmin.findById({_id:req.body.turfAdminId})
        if(turfAdmin){
            turfAdmin.isVerified = true;
            await turfAdmin.save();
        }
        const turfAdminData = await TurfAdmin.findById({_id:req.body.turfAdminId});
        res.status(200).json({message:'verified successfully',turfAdminData})
    } catch (error) {
        res.status(500).json({message:'Internal server error'})
    }
}

const addSports = async(req,res)=>{
    try {
        const {sportsName,sportsDimension} = req.body;
        const sports = await SportsModel.findOne({sportsName:sportsName});
        if(sports){
            res.status(404).json({message:'entered sports already exists'})
        }else{
            const sportsAdded = new SportsModel({
                sportsName:sportsName,
                sportsDimensions:sportsDimension
            })
            await sportsAdded.save();
            res.status(200).json({message:'sports added successfully'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal server error'})
    }
}

const getSingleTurfAdmin = async(req,res)=>{
    try {
        const turfAdmin = await TurfAdmin.findById(req.body.id)
        console.log(turfAdmin);
        res.status(200).json({turfAdmin})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'internal server error'})
    }
}

const getSports =async(req,res)=>{
    try {
        const sports = await SportsModel.find();
        console.log(sports);
        res.status(200).json({sports,message:"sports data fetched successfully"});
    } catch (error) {
        res.status(500).json({message:'Internal server error '})
    }
}

module.exports = {
    adminLogin,
    getDashboardDetails,
    blockOrUnblock,
    getTurfAdminDetails,
    verifyTurfAdmin,
    addSports,
    getSingleTurfAdmin,
    getSports,
    usersDetails
}