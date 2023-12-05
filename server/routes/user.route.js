const express = require('express');
const userRoute = express();
const userController = require('../controllers/user.controller');
const turfController = require('../controllers/turf.controller');
const bookingController = require('../controllers/bookings.controller');
const ratingController = require('../controllers/rating.controller')
const { verifyUserJwt } = require('../middlewares/jwtHelper')
const isBlocked = require('../middlewares/isBlocked');

userRoute.post('/register',userController.validationChecker,userController.register);
userRoute.post('/login',userController.login);
userRoute.post('/verifyUser',userController.verifyUserBeforeOtp);

userRoute.get('/turf-lists',verifyUserJwt,isBlocked,turfController.turfLists)
userRoute.get('/turfs-types',verifyUserJwt,isBlocked,userController.getSportsTYpes);
userRoute.post('/search-turfs',verifyUserJwt,isBlocked,userController.searchTurfs)
userRoute.get('/turf-slots/:turfId',verifyUserJwt,isBlocked,userController.turfSlotsAvailable)
userRoute.get('/profile',verifyUserJwt,isBlocked,userController.userProfile)
userRoute.patch('/updateProfile',verifyUserJwt,isBlocked,userController.updateProfile);
userRoute.post('/checkout',verifyUserJwt, isBlocked,bookingController.checkoutSession);
userRoute.post('/checkout/webhook', express.raw({type: 'application/json'}),bookingController.webhooks)
userRoute.get('/booking-details',verifyUserJwt,isBlocked,bookingController.bookingDetails);
userRoute.patch('/cancel-booking',verifyUserJwt,isBlocked,bookingController.cancelBooking);
userRoute.patch('/update-slots',verifyUserJwt,isBlocked,bookingController.updateSlots)
userRoute.get('/single-booking/:bookingId',verifyUserJwt,isBlocked, bookingController.singleBooking);
userRoute.get('/get-location/:turfId',verifyUserJwt,isBlocked,bookingController.getTurfLocation);
userRoute.post('/book-wallet',verifyUserJwt,isBlocked,bookingController.checkWalletAndBook)
userRoute.post('/turf-rating', verifyUserJwt,isBlocked,ratingController.turfRating)
userRoute.post('/add-rating',verifyUserJwt,isBlocked,ratingController.addRating)

module.exports = userRoute;