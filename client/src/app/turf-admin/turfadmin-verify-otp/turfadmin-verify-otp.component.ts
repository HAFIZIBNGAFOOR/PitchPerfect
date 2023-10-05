import { Component } from '@angular/core';
import { TurfAdmin } from '../state/turf-admin.state';
import { FirebaseService } from 'src/app/shared/firebaseService/firebase.service';
import  firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/firestore';
import { turfAdminSignupFailed, turfAdminSignupSuccess } from '../state/turf-admin.action';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectTurfAdminData } from '../state/turf-admin.selector';
import { TurfAdminService } from '../turf-admin-service/turf-admin.service';


@Component({
  selector: 'app-turfadmin-verify-otp',
  templateUrl: './turfadmin-verify-otp.component.html',
  styleUrls: ['./turfadmin-verify-otp.component.css']
})
export class TurfadminVerifyOtpComponent {
  OTP:string ='';
  turfAdminData!:TurfAdmin|any;
  verify=JSON.parse(localStorage.getItem('verificationId')||'')

  constructor(private firebaseService:FirebaseService, private router:Router,private store:Store, private turfAdminService:TurfAdminService){}

  ngOnInit(): void {
    this.firebaseService.config();
  }
  getOTP(event:string){
    this.OTP = event
    const credentials = firebase.auth.PhoneAuthProvider.credential(this.verify,this.OTP);

    firebase
    .auth()
    .signInWithCredential(credentials)
    .then((res:any)=>{
      this.store.select(selectTurfAdminData).subscribe((data)=>{
        this.turfAdminData = data
        this.turfAdminService.turfAdminSignup(this.turfAdminData).subscribe((res)=>{
          console.log(res,' this is lo0g inside the signup api service calling subscribe');
          this.router.navigate(['/turf-owner/login']);
          this.store.dispatch(turfAdminSignupSuccess({userData:this.turfAdminData}));
        },
        err=>{
          console.log(err);
          this.store.dispatch(turfAdminSignupFailed({error:err.error.message}));
          this.router.navigate(['/turf-owner/signup']);
        })
      })
    })
    .catch(err=>{
      console.log(err);
      this.store.dispatch(turfAdminSignupFailed({error:err}))
    })
  }
}
