// const hashPassword = require("../helperFunctions/hashpassword");
const AdminModel = require("../model/admin.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
// const adminRegister = async(req,res)=>{
//     try {
//         const { email, password }= req.body;
//         const hashedPass =await  hashPassword(password)
//         const newAdmin = await AdminModel.create({email,password:hashedPass}); 
//         res.status(200).json({messge:"saved successfully",data:newAdmin})
//     } catch (error) {
//         console.log('error from admin register ',error);
//     }
// }
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
        console.log(error,' this is admin login error');
    }
}

const getDashboardDetails=async(req,res)=>{
    try {
        const users =await  User.find({});
        res.status(200).json({users:users,message:'this is users list'})
    } catch (error) {
        res.status(500).json({message:'error fetching user'})
        console.log(error);
    }
}
module.exports = {
    adminLogin,
    getDashboardDetails
}