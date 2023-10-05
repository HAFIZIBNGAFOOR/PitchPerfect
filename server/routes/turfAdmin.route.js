const express  = require("express");
const turfAdminController = require("../controllers/turfadmin.controller")
const turfAdminRoute = express();
const jwtHelper = require("../config/jwtHelper"); 


turfAdminRoute.post('/turfAdmin/register',turfAdminController.registerTurfAdmin);
turfAdminRoute.post('/turfAdmin/verify',turfAdminController.verifyTurfAdminBeforeOtp)
turfAdminRoute.post('/turfAdmin/login',turfAdminController.loginTurfAdmin);
turfAdminRoute.get('/turfAdmin/home',jwtHelper.verifyTurfAdminJwt);

module.exports = turfAdminRoute