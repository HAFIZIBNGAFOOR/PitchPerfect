const express = require("express");
const adminRoute = express();
const adminController = require("../controllers/admin.controller");
const bookingController = require('../controllers/bookings.controller');
const turfController = require('../controllers/turf.controller')
const { verifyAdminJwt } = require("../middlewares/jwtHelper");

// adminRoute.post('/register',adminController.adminRegister);
adminRoute.post('/login',adminController.adminLogin)
adminRoute.get('/dashboard',adminController.getDashboardDetails)
adminRoute.get('/users',verifyAdminJwt,adminController.usersDetails)
adminRoute.post("/blockUnblock",verifyAdminJwt,adminController.blockOrUnblock);
adminRoute.get("/turfAdminData",verifyAdminJwt,adminController.getTurfAdminDetails);
adminRoute.post("/verifyTurfAdmin",verifyAdminJwt,adminController.verifyTurfAdmin);
adminRoute.post('/addSports',verifyAdminJwt,adminController.addSports);
adminRoute.post('/getTurfAdmin',verifyAdminJwt,adminController.getSingleTurfAdmin);
adminRoute.get('/getSports',verifyAdminJwt,adminController.getSports);
adminRoute.get('/get-bookings',verifyAdminJwt,bookingController.getFullTurfDetails);
adminRoute.get('/get-turfs',verifyAdminJwt,turfController.turfLists);

module.exports = adminRoute