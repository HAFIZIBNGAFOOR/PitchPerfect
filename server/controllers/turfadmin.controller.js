const hashPassword = require("../helperFunctions/hashpassword")
const TurfAdmin = require("../model/turfAdmin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SportsModel = require('../model/sports.model');
const TurfModel = require("../model/turf.model");

const verifyTurfAdminBeforeOtp = async(req,res)=>{
    try {
        const turfAdmin = await TurfAdmin.findOne({phone:req.body.phone})
        if(turfAdmin) res.status(404).json({message:'Entered numbered already exists'})
        else res.status(200).json({message:'Continue to  send otp'})
    } catch (error) {
        res.status(500).json({message:'something went wrong  server error '})
    }
}
const registerTurfAdmin = async(req,res)=>{
    try {
            const {userName,email,phone,password } =req.body;
            const hashedPass = await hashPassword(password);
            const newTurfAdmin = await TurfAdmin.create({turfAdminName:userName,email:email,phone:phone, password:hashedPass});
            res.status(200).json({message:"turf admin added successfully ",turfAdmin:newTurfAdmin});         
    } catch (error) {
        res.status(500).json({mesage:"something went wrong try again"})
    }
}
const loginTurfAdmin = async(req,res)=>{
    try {
        let turfAdmin = await TurfAdmin.findOne({phone:req.body.phone});
        if(turfAdmin){
            let passMatch = bcrypt.compareSync(req.body.password, turfAdmin.password);
            if(passMatch){
                const payload = {id:turfAdmin._id,name:turfAdmin.turfAdminName}
                const token = jwt.sign(payload,process.env.JWT_TURFSECRET,{expiresIn:"1d"});
                res.status(200).json({message:"turf admin logged in successfully ",token:token});
            }else res.status(401).json({message:"Incorrect password"})
        }else res.status(404).json({message:"Entered number not registered"});
    } catch (error) {
        res.status(500).json({message:"something went wrong try again"});

    }
}
const sportsType = async(req,res)=>{
    try {
        const sports = await SportsModel.find();
        console.log(sports,' this is sports from sports type');
        res.status(200).json({sports}) 
    } catch (error) {
        console.log(error);
        res.status(200).json({message:'internal server error'})
    }
}
const addTurf = async(req,res)=>{
    try {
        const { turfName, turfLocation,turfContact,turfFacilities,sportsDimension,sportsType,turfPrice} =req.body
        const parsedLoc = JSON.parse(turfLocation)
        if(req.file){
            console.log(req.file,parsedLoc);
            const fileName = req.file.path;
            const addTurf = new TurfModel();
            addTurf.turfName = turfName,
            addTurf.turfLocation.Address = parsedLoc.address,
            addTurf.turfLocation.lat =parsedLoc.lat,
            addTurf.turfLocation.long =parsedLoc.long,
            addTurf.turfContact = turfContact
            addTurf.facilities = turfFacilities
            addTurf.sportsDimension = sportsDimension
            addTurf.sportsType = sportsType
            addTurf.turfPrice = turfPrice,
            addTurf.turfImages = fileName
            await addTurf.save()
        res.status(200).json({message:'got the turf details'})
        }else{
            res.status(400).json({message:'no file type'})
        }

    } catch (error) {
        console.log(error,' this is error');
        res.status(500).json({message:'internal server error '})
    }
}
const listTurfs = async(req,res)=>{
    try {
        const turflists = await TurfModel.find();
        console.log(' no turfs found turfLists',turflists);
        if(turflists.length>0){
            res.status(200).json({turflists})
        }else res.status(400).json({message:'no turfs found'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'internal server error '})
    }
}
module.exports = {
    registerTurfAdmin,
    loginTurfAdmin,
    verifyTurfAdminBeforeOtp,
    sportsType,
    addTurf,
    listTurfs
}