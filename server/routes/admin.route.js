const express = require("express");
const adminRoute = express();
const adminController = require("../controllers/admin.controller");
const { verifyAdminJwt } = require("../config/jwtHelper");

// adminRoute.post('/register',adminController.adminRegister);
adminRoute.post('/login',adminController.adminLogin)
adminRoute.get("/dashboard",verifyAdminJwt,adminController.getDashboardDetails)
adminRoute.post("/blockUnblock",verifyAdminJwt,adminController.blockOrUnblock);
adminRoute.get("/turfAdminData",verifyAdminJwt,adminController.getTurfAdminDetails);
adminRoute.post("/verifyTurfAdmin",verifyAdminJwt,adminController.verifyTurfAdmin);
adminRoute.post('/addSports',verifyAdminJwt,adminController.addSports);


module.exports = adminRoute