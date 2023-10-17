const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage} = require("multer-storage-cloudinary")
const multer = require('multer')

cloudinary.config({
    cloud_name:'dtjwgoss4',
    api_key:'498264998284537',
    api_secret:'P67----YhRL4M6g9j3xhxuHa4og',
    secure:true
})

const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'play-perfect',
        resource_type:'auto',
        allowed_formats:['jpg','png'],
        transformation:[{width:400,height:400,crop:'limit'}]
    }
});
const upload = multer({storage:storage});

 module.exports = upload