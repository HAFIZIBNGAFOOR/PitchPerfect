import { Injectable } from '@angular/core';
import  firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/firestore';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import { userOTPSendFailed, userOTPSendSuccess, userSendOtp,  } from '../../user/state/user.action';
import { Router } from '@angular/router';
import { turfAdminSendOTP, turfAdminSendOTPFailed, turfAdminSendOTPSuccess } from '../../turf-admin/state/turf-admin.action';

var config={
  apiKey: "AIzaSyDO7Rgjpl5BrlFiVy_-sQkNdcAhe7GNigs",
  authDomain: "pitchperfect-f99d3.firebaseapp.com",
  projectId: "pitchperfect-f99d3",
  storageBucket: "pitchperfect-f99d3.appspot.com",
  messagingSenderId: "497675220962",
  appId: "1:497675220962:web:0ea6ece56a11589530abbb",
  measurementId: "G-WRC3VW4QKB"
}
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  verifier:any;

  constructor(private store :Store,private router:Router) { }
  config(){
    firebase.initializeApp(config)
  }
  sendUserOtp(phone:string){
    this.verifier = new firebase.auth.RecaptchaVerifier('signinbutton',{size:'invisible'});
    this.store.dispatch(userSendOtp({phone}))
    const ogNumber = `+91${phone}`
    firebase
    .auth()
    .signInWithPhoneNumber(ogNumber,this.verifier)
    .then((res)=>{
      localStorage.removeItem('verificationId');
      localStorage.setItem('verificationId',JSON.stringify(res.verificationId));
     this.store.dispatch(userOTPSendSuccess({res}));
     this.router.navigate(['/verify']);
    })
    .catch((err)=>{
      console.log('this is response from firebase error',err);
      this.store.dispatch(userOTPSendFailed({error:err}))
    })
  }
  sendTurfAdminOTP(phone:string){
    this.verifier = new firebase.auth.RecaptchaVerifier('signinbutton',{size:'invisible'});
    this.store.dispatch(turfAdminSendOTP({phone}));
    const ogNumber =`+91${phone}`
    firebase
    .auth()
    .signInWithPhoneNumber(ogNumber,this.verifier)
    .then((res)=>{
      localStorage.removeItem('verificationId')
      localStorage.setItem('verificationId',JSON.stringify(res.verificationId))
      this.store.dispatch(turfAdminSendOTPSuccess());
      console.log('this is inside the turf admin otp send success');
      
      this.router.navigate(['/turf-owner/verify']);
    })
    .catch((err)=>{
      console.log(err,' in send turf admin otp inside the firebase service');
      this.store.dispatch(turfAdminSendOTPFailed())
    })
  }
    
    
}
