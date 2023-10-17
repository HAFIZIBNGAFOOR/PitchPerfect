const express = require('express');
const userRoute = express();
const userController = require('../controllers/user.controller');
const { verifyUserJwt } = require('../config/jwtHelper');
const isBlocked = require('../config/isBlocked');

userRoute.post('/register',userController.validationChecker,userController.register);
userRoute.post('/login',userController.login);
userRoute.post('/verifyUser',userController.verifyUserBeforeOtp);

userRoute.get('/home',verifyUserJwt,isBlocked,userController.userHome);
userRoute.get('/turf-lists',verifyUserJwt,isBlocked,userController.turfLists)
userRoute.get('/turfs-types',verifyUserJwt,isBlocked,userController.getSportsTYpes);
userRoute.post('/search-turfs',verifyUserJwt,isBlocked,userController.searchTurfs)

module.exports = userRoute;