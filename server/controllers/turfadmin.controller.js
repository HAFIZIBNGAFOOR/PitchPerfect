const hashPassword = require("../helperFunctions/hashpassword")
const TurfAdmin = require("../model/turfAdmin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const verifyTurfAdminBeforeOtp = async(req,res)=>{
    try {
        const turfAdmin = await TurfAdmin.findOne({phone:req.body.phone})
        if(turfAdmin) res.status(404).json({message:'Entered numbered already exists'})
        else res.status(200).json({message:'Continue to  send otp'})
        console.log(turfAdmin);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'something went wrong  server error '})
    }
}
const registerTurfAdmin = async(req,res)=>{
    try {
        const {userName,email,phone,password } =req.body;
        console.log(req.body,' inside the register turf admin');

            const hashedPass = await hashPassword(password);
            const newTurfAdmin = await TurfAdmin.create({turfAdminName:userName,email:email,phone:phone, password:hashedPass});
            res.status(200).json({message:"turf admin added successfully ",turfAdmin:newTurfAdmin});         
    } catch (error) {
        console.log(' this is register truf admin error',error);
        res.status(500).json({mesage:"something went wrong try again"})
    }
}
const loginTurfAdmin = async(req,res)=>{
    try {
        console.log(req.body,' this is login turf admin log')
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


module.exports = {
    registerTurfAdmin,
    loginTurfAdmin,
    verifyTurfAdminBeforeOtp
}