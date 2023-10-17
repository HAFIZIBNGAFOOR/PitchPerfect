const mongoose = require('mongoose');

const SportsSchema = new mongoose.Schema({
    sportsName:{
        type:String,
        required:true
    },
    sportsDimensions:{
        type:[ String ],
        required:true
    }

})
const SportsModel = mongoose.model('Sports',SportsSchema);
module.exports = SportsModel