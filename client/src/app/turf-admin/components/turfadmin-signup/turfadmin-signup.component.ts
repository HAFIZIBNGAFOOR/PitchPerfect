import { Component } from '@angular/core';
import { TurfAdminService } from '../../turf-admin-service/turf-admin.service';
import { Store } from '@ngrx/store';
import {  turfAdminSignupSubmit } from '../../state/turf-admin.action';
import { FirebaseService } from '../../../shared/firebase-service/firebase.service';
import { TurfAdmin } from '../../models/turf-admin.model';

@Component({
  selector: 'app-turfadmin-signup',
  templateUrl: './turfadmin-signup.component.html',
  styleUrls: ['./turfadmin-signup.component.css']
})
export class TurfadminSignupComponent {
  role:string ='Turf Admin';
  signupData!:TurfAdmin;
  serverError!:string;

  constructor(private turfAdminService:TurfAdminService,private store:Store,private firbaseService:FirebaseService){}

  ngOnInit(): void {
    this.firbaseService.config()
  }
  getSignupData(data:TurfAdmin){
    this.signupData = data;
    // this.store.dispatch(turfAdminSendOTP());
    this.turfAdminService.verifyTurfAdminBeforeOTP(this.signupData.phone).subscribe(
      (res)=>{
        this.store.dispatch(turfAdminSignupSubmit({userData:this.signupData}))
        this.firbaseService.sendTurfAdminOTP(this.signupData.phone);
      },
      err=>{
        this.serverError = err.error.message
      }
    )
  }
}
