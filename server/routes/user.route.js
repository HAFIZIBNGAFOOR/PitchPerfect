const express = require('express');
const userRoute = express();
const userController = require('../controllers/user.controller');
const { verifyUserJwt } = require('../config/jwtHelper');

userRoute.post('/register',userController.validationChecker,userController.register);
userRoute.post('/login',userController.login);
userRoute.post('/verifyUser',userController.verifyUserBeforeOtp);

userRoute.get('/home',verifyUserJwt)


module.exports = userRoute;