const jwt  = require("jsonwebtoken");

const verifyUserJwt = async(req,res,next)=>{
    let token;
    if('authorization' in req.headers){
        token = req.headers['authorization'].split(' ')[1];
    }
    if(token){
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.id = decoded.id;
            next()
        } catch (error) {
           if(error instanceof jwt.TokenExpiredError) res.status(400).json({message:"token expired"}) ;
           else res.status(400).json({message:"token authentication failed"})
        }
    } 
}
const verifyTurfAdminJwt = async(req,res,next)=>{
    try {
        let token ;
        if('authorization' in req.headers) token = req.headers['authorization'].split(' ')[1];
        if(token){
            const decoded = jwt.verify(token,process.env.JWT_TURFSECRET);
            req.id= decoded.id;
            next()
        }
    } catch (error) {
        console.log(error,'error from jwt verify in turf admin');
        if(error instanceof jwt.TokenExpiredError) res.status(401).status({messge:' token expired '})
        else res.status(400).json({message:'token verify failed'})
    }
}
const verifyAdminJwt = async (req,res,next)=>{
    try {
        let token;
        if('authorization' in req.headers) token = req.headers['authorization'].split(" ")[1];
        if(token){
            const decoded = jwt.verify(token,process.env.ADMINJWT_SECRET);
            req._id = decoded._id;
            next()
        }
    } catch (error) {
        if(error instanceof jwt.TokenExpiredError) res.status(400).json({message:" token expired "})
        else res.status(400).json({message:'token verification failed'})
    }
}


module.exports ={
    verifyUserJwt,
    verifyTurfAdminJwt,
    verifyAdminJwt
}