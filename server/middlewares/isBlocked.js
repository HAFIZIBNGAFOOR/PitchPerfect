const express = require('express');
const User = require('../model/user.model');
const app = express();
const isBlocked = async(req,res,next)=>{
    try {
        const user = await User.findOne({_id:req.id});
        if(user.isBlocked){
            res.status(403).json({message:'blocked by admin'});
        }else{
            next()
        }
    } catch (error) {
        res.status(200).json({message:'Internal Server error'})
    }
}

module.exports = isBlocked