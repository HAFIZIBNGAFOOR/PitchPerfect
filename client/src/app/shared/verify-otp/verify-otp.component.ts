import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import  firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/firestore';
import { FirebaseService } from '../firebaseService/firebase.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOTPComponent {
  @Output() OTP : EventEmitter<any>=new EventEmitter();
  otpCode!:string;
  constructor(){}

  onOtpChange(event:any){
    this.otpCode = event;
  }
  onSubmit(event:Event){
    event.preventDefault()
    this.OTP.emit(this.otpCode);
  }
}
  


