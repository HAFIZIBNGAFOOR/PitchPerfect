const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage} = require("multer-storage-cloudinary")
require('dotenv').config();

cloudinary.config({
    cloud_name:'dtjwgoss4',
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET,
    secure:true
})

exports.uploads = (buffer, folder)=>{
    return new Promise((resolve,reject)=>{
       const stream =  cloudinary.uploader.upload_stream({
            resource_type:'auto',
            folder:folder
        },(err,res)=>{
            if(err){
                reject(err)
            }else{
                resolve({
                    url:res.url,
                    id:res.public_id
                })
            }
        })
        stream.end(buffer);
    })
}