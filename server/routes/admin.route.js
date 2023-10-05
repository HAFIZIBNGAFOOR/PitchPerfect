const express = require("express");
const adminRoute = express();
const adminController = require("../controllers/admin.controller");
const { verifyAdminJwt } = require("../config/jwtHelper");

// adminRoute.post('/register',adminController.adminRegister);
adminRoute.post('/login',adminController.adminLogin)
adminRoute.get("/dashboard",verifyAdminJwt,adminController.getDashboardDetails)


module.exports = adminRoute