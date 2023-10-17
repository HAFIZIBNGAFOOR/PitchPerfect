// const hashPassword = require("../helperFunctions/hashpassword");
const AdminModel = require("../model/admin.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const TurfAdmin = require('../model/turfAdmin.model');
const SportsModel = require("../model/sports.model");

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
        const users =await  User.find({});
        res.status(200).json({users:users,message:'this is users list'})
    } catch (error) {
        res.status(500).json({message:'error fetching user'})
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
        const turfAdminData = await TurfAdmin.find();
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
module.exports = {
    adminLogin,
    getDashboardDetails,
    blockOrUnblock,
    getTurfAdminDetails,
    verifyTurfAdmin,
    addSports
}