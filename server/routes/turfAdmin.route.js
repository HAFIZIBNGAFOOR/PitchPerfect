const express  = require("express");
const turfAdminController = require("../controllers/turfadmin.controller")
const turfController = require('../controllers/turf.controller')
const turfAdminRoute = express();
const jwtHelper = require('../middlewares/jwtHelper'); 
const upload = require("../config/multer");


turfAdminRoute.post('/turfAdmin/register',turfAdminController.registerTurfAdmin);
turfAdminRoute.post('/turfAdmin/verify',turfAdminController.verifyTurfAdminBeforeOtp)
turfAdminRoute.post('/turfAdmin/login',turfAdminController.loginTurfAdmin);
turfAdminRoute.get('/turfAdmin/home',jwtHelper.verifyTurfAdminJwt,turfAdminController.turfAdminDashboard);
turfAdminRoute.get('/turfAdmin/get-sports',jwtHelper.verifyTurfAdminJwt,turfAdminController.sportsType);
turfAdminRoute.post('/turfAdmin/testingCloudinary',jwtHelper.verifyTurfAdminJwt,upload.array('turfImages',5),turfAdminController.addTurf)

// turfAdminRoute.post('/turfAdmin/testingCloudinary',jwtHelper.verifyTurfAdminJwt,upload.array('turfImages',5),turfAdminController.testing)

turfAdminRoute.get('/turfAdmin/turf-lists',jwtHelper.verifyTurfAdminJwt,turfController.listTurfs)
turfAdminRoute.get('/turfAdmin/getSingleTurf/:turfId',jwtHelper.verifyTurfAdminJwt,turfController.getSingleTurf)
turfAdminRoute.get('/turfAdmin/timeSlots/:turfId/:date',jwtHelper.verifyTurfAdminJwt,turfAdminController.timeSlots)
turfAdminRoute.post('/turfAdmin/addSlots',jwtHelper.verifyTurfAdminJwt,turfAdminController.addSlots)

module.exports = turfAdminRoute