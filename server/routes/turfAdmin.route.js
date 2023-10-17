const express  = require("express");
const turfAdminController = require("../controllers/turfadmin.controller")
const turfAdminRoute = express();
const jwtHelper = require("../config/jwtHelper"); 
const uploaad = require("../config/cloudinary");


turfAdminRoute.post('/turfAdmin/register',turfAdminController.registerTurfAdmin);
turfAdminRoute.post('/turfAdmin/verify',turfAdminController.verifyTurfAdminBeforeOtp)
turfAdminRoute.post('/turfAdmin/login',turfAdminController.loginTurfAdmin);
turfAdminRoute.get('/turfAdmin/home',jwtHelper.verifyTurfAdminJwt);
turfAdminRoute.get('/turfAdmin/get-sports',jwtHelper.verifyTurfAdminJwt,turfAdminController.sportsType);
turfAdminRoute.post('/turfAdmin/add-turf',uploaad.single('turfImages'),turfAdminController.addTurf)
turfAdminRoute.get('/turfAdmin/turf-lists',turfAdminController.listTurfs)

module.exports = turfAdminRoute