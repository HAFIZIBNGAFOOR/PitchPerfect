const express = require ('express');
const User  = require('../model/user.model');
const bcrypt = require ('bcrypt');
const { body,validationResult } = require('express-validator')
const hashPassword = require("../helperFunctions/hashpassword")
const jwt = require("jsonwebtoken");

// const hashPassword = async (password)=>{
//     try {
//         const hashPassword = await bcrypt.hash(password,10);
//         return hashPassword
//     } catch (error) {
//         console.log('hashing password error ', error);
//     }

// }
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
        console.log('inside user signup',req.body);
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors);
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
        console.log('inside login',req.body);
        const user = await User.findOne({phone:req.body.phone});
        console.log(user);
        if(user){
            const passMatch = bcrypt.compareSync(req.body.password,user.password);
            if(passMatch){
                const payload  ={name:user.userName,id:user._id}
                const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1d"});
                res.status(200).json({success:true,message:"logged in successfully",token:token});
            }else res.status(401).json({message:"Incorrect Password ",success:false,})
        }else res.status(400).json({message:"User not Found"})
    } catch (error) {
        console.log(error,' this is login error');
    }
}
const userData = async(req,res)=>{
    try {
        const user = await User.findOne({_id:req.id})
        res.status(200).json({user:user,message:'user data retriedved successfully'})
    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }
}

module.exports ={
    register,
    validationChecker,
    login,
    verifyUserBeforeOtp,
    removeNonVerified
}