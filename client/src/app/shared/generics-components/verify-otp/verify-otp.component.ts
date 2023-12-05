import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import  firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOTPComponent {
  @Output() OTP : EventEmitter<any>=new EventEmitter();
  otpCode!:string;
  @Input() getError!:string;
  constructor(){}

  onOtpChange(event:any){
    this.otpCode = event;
  }

  
  onSubmit(event:Event){
    event.preventDefault()
    this.OTP.emit(this.otpCode);
    console.log(this.getError);
  }
}
  


