const express = require ('express');
const User  = require('../model/user.model');
const bcrypt = require ('bcrypt');
const { body,validationResult } = require('express-validator')
const hashPassword = require("../helperFunctions/hashpassword")
const jwt = require("jsonwebtoken");
const TurfModel = require('../model/turf.model');
const SportsModel = require('../model/sports.model');


const validationChecker = [
    body('userName')
    .notEmpty().withMessage("user is required")
    .isLength({min:4,max:16}).withMessage("name must be in minimum 4 and maximum 16"),
    body("email")
    .isEmail().withMessage('Please enter a valid email address '),
    body("password")
    .isLength({min:8,max:16}).withMessage("minimum 8 characters required")
]

const register = async(req,res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(403).json({error:errors.array()})
        }else{
            const {userName, email ,phone, password } = req.body;
                const hashedPass =await  hashPassword(password);
                const user = await User.create({userName,email,phone,password:hashedPass});
                res.status(200).json({message:'signup successfull',user:user})
        }
    } catch (error) {
        res.status(500).json({error:'errror ocuured'})
        console.log(error,' this is user registration error ' );
    }
}
const verifyUserBeforeOtp = async(req,res)=>{
    try {
        const { phone }= req.body;
        const user = await User.findOne({phone:phone})
        if(user){
            res.status(404).json({message:"Entered number already exists ",})
        }else res.status(200).json({message:'Continue for the OTP',status:true})

    } catch (error) {
        res.status(500).json({message:"something went wrong try again"})
        console.log(error);
    }
}

const removeNonVerified= async(req,res)=>{
    try {
        const phone = req.body.phone;
        await User.findOneAndDelete({phone});
        res.status(200).json({message:"non verified user removed successfully"})
    } catch (error) {
        res.status(500).json({message:"something went wrong try again"})
    }
}
const login= async(req,res)=>{
    try {
        const user = await User.findOne({phone:req.body.phone});
        if(!user.isBlocked){
            if(user){
                const passMatch = bcrypt.compareSync(req.body.password,user.password);
                if(passMatch){
                    const payload  ={name:user.userName,id:user._id}
                    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1d"});
                    res.status(200).json({success:true,message:"logged in successfully",token:token});
                }else res.status(401).json({message:"Incorrect Password ",success:false,})
            }else res.status(400).json({message:"User not Found"})
        }else res.status(400).json({message:'User is blocked by admin'});
    } catch (error) {
        res.status(500).json({message:'internal server error'})
    }
}
const userHome = async(req,res)=>{
    try {
        const user = await User.findOne({_id:req.id})
        res.status(200).json({user:user,message:'user data retriedved successfully'})
    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }
}
const turfLists = async(req,res)=>{
    try {
        const turfs = await TurfModel.find({});
        if(turfs){
            res.status(200).json({message:'turf data fetched successfully',turfs})
        }else{
            console.log('not turfs to list ');
            res.status(400).json({message:'no turfs to list '})
        }
    } catch (error) {
        console.log(error);
    }
}
const getSportsTYpes = async(req,res)=>{
    try {
        const sportsTypes =  await SportsModel.find();
        console.log(sportsTypes);
        if(sportsTypes){
            res.status(200).json({sportsTypes,message:'sports details'})
        }else{
            res.status(400).json({message:'no sports available'})
        }
    } catch (error) {
        console.log(error, "this is insdie get types of sports");
        res.status(500).json({message:" internal server error "})
    }
}
const searchTurfs = async(req,res)=>{
    try {
        console.log(req.body);
        const {sports, dimension,minPrice,maxPrice} = req.body;
        let searchRes =''
        if(sports && dimension && minPrice>0 && maxPrice>minPrice){
            searchRes = await TurfModel.find({turfPrice:{$gte:minPrice,$lt:maxPrice},sportsType:sports,sportsDimension:dimension})
            console.log(sports,dimension,minPrice,maxPrice,searchRes,'1');
        }else if(sports && dimension && !minPrice &&!maxPrice){
            searchRes = await TurfModel.find({sportsType:sports,sportsDimension:dimension})
            console.log(sports,dimension,minPrice,maxPrice,searchRes,'2');
        }else if(minPrice>0 && maxPrice>minPrice && !sports && !dimension){
            searchRes = await TurfModel.find({turfPrice:{$gte:minPrice,$lt:maxPrice}});
            console.log(sports,dimension,minPrice,maxPrice,searchRes,'3');           
        }else if(sports && !dimension && minPrice>0 && maxPrice>minPrice){
            searchRes = await TurfModel.find({turfPrice:{$gte:minPrice,$lt:maxPrice},sportsType:sports});  
            console.log(sports,dimension,minPrice,maxPrice,searchRes,'4');
        }else if(sports && !dimension && !minPrice && !maxPrice){
            searchRes = await TurfModel.find({sportsType:sports});  
        }
        console.log(searchRes,' this is inside the serach turfs ');
        if(searchRes.length>0)res.status(200).json({searchRes})
        else res.status(404).json({message:' no turf found'})
    } catch (error) {
        console.log(error,' this is error from serch turfs')
        res.status(500).json({message:'internal server error'})
    }
}
module.exports ={
    register,
    validationChecker,
    login,
    verifyUserBeforeOtp,
    removeNonVerified,
    userHome,
    turfLists,
    getSportsTYpes,
    searchTurfs
}