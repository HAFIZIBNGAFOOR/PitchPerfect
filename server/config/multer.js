const multer = require('multer');


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/png' || file.mimetype ==='image/jpeg'){
        cb(null,true)
    }else{
        cb({message:'unsupported file type'},false)
    }
}
const upload = multer({
    storage:storage,
    limits:{fileSize:8*1024*1024},
    fileFilter:fileFilter
})

module.exports = upload