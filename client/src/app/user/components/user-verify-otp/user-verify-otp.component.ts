import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/firebase-service/firebase.service';
import  firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/firestore';
import { UserService } from '../../service/user.service';
import { UserData } from '../../state/user.interface';
import { Store } from '@ngrx/store';
import { selectOtpError, selectUserData } from '../../state/user.selector';
import {MatSnackBar, MatSnackBarRef, MatSnackBarModule} from '@angular/material/snack-bar';
import {  userSignupFailed, userSignupSuccess } from '../../state/user.action';

@Component({
  selector: 'app-user-verify-otp',
  templateUrl: './user-verify-otp.component.html',
  styleUrls: ['./user-verify-otp.component.css']
})
export class UserVerifyOtpComponent {
  OTP!:string;
  userData!:UserData|any;
  verify = JSON.parse(localStorage.getItem('verificationId')|| '') 
  otpError!:string;

  constructor(private store:Store ,private router:Router,private firebaseService:FirebaseService,private userService:UserService,private snackBar:MatSnackBar){}
    ngOnInit(): void {
      this.firebaseService.config()
    }
  async getOTP(event:string){
    this.OTP = event;
    const credentials = firebase.auth.PhoneAuthProvider.credential(this.verify,this.OTP);
    console.log(credentials);
    firebase
    .auth()
    .signInWithCredential(credentials)
    .then(res=>{
        this.store.select(selectUserData).subscribe((data)=>{
          this.userData = data;
          this.userService.userSingup(this.userData).subscribe(
            (res)=>{
              console.log(res,' this is lo0g inside the signup api service calling subscribe');
              this.snackBar.open('User registered successfully','close',{
                duration:3000
              })
              this.router.navigate(['/login'])
              this.store.dispatch(userSignupSuccess({userData:this.userData}))
            },
            (err)=>{
              this.store.dispatch(userSignupFailed({error:err}))
              this.otpError = 'Enter A valid OTP'
            }
          )
        })
      })
      .catch(err=>{
        console.log('otp verification failed');
        this.store.dispatch(userSignupFailed({error:'Please enter a valid OTP'}));
        this.store.select(selectOtpError).subscribe({
          next:(res)=>{
            this.otpError = 'Enter A Valid OTP'
          }
        })
      })
  }
  
}

