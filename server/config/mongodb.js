const mongoose = require('mongoose');
const dbConnect = async()=>{
    try {
       const connection = await mongoose.connect(process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 60000,
            })
            console.log('MongoDb connected successfully');

    } catch (error) {
        console.log(error,'mongo connection error ');
        // process.exit(1)
    }
}
module.exports = dbConnect
