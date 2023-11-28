const { convert12HourTo24Hour } = require("../helperFunctions/convertTIme");
const formatDate = require("../helperFunctions/formatdate");
const TurfModel = require("../model/turf.model");
const stripe = require('stripe')('sk_test_51OADBiSICdW4biAoXtJw43gGIEOWavpxJ3dkFcmumlIVTKPI97q9BPVhXuabFhkvmcSaYGk2XRW05UxnTVgTwoL800nZ4QssiF');

const turfLists = async(req,res)=>{
    try {
        const turfs = await TurfModel.find({});
        if(turfs){
            res.status(200).json({turfs})
        }else{
            res.status(400).json({message:'No turfs to list '})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:" Internal server error "})
    }
}
const listTurfs = async(req,res)=>{
    try {
        const turflists = await TurfModel.find({turfOwner:req.id});
        if(turflists.length>0){
            res.status(200).json({turflists})
        }else res.status(400).json({message:'No turfs found'});
    } catch (error) {
        res.status(500).json({message:'Internal server error '})
    }
}
const getSingleTurf = async(req,res)=>{
    try {
        const turfId = req.params.turfId;
        updateSlotWithExpiredDates(turfId)
        const turf = await TurfModel.findById({_id:turfId})
        if(turf) res.status(200).json({turf})
        else res.status(400).json({message:'entered turf is not available enter a valid turf id'})

    } catch (error) {
        res.status(500).json({message:'internal server error'})
    }
}
const updateSlotWithExpiredDates  = async(turfId)=>{
    try {
        const updatedTurf = await TurfModel.findById(turfId);
        const currentDate = new Date();
        const today = new Date(currentDate.toISOString().split('T')[0])
        if(updatedTurf.slots && updatedTurf.slots.length>0){
            updatedTurf.slots = updatedTurf.slots.filter(slot => today <= slot.date )
            const todaysDateIndex = updatedTurf.slots.findIndex(slot => slot.dateString == formatDate(currentDate))
            if(todaysDateIndex !== -1){
                updatedTurf.slots[todaysDateIndex].timeSlots = updatedTurf.slots[todaysDateIndex].timeSlots.filter(slot=>convert12HourTo24Hour(slot.start).split(':')[0] > currentDate.getHours()+1 )
            }
        }
        await updatedTurf.save()
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    listTurfs,
    getSingleTurf,
    turfLists,
    updateSlotWithExpiredDates
}