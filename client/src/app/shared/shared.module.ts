import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyOTPComponent } from './verify-otp/verify-otp.component';


import { FlexLayoutModule } from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { NgOtpInputModule } from 'ng-otp-input';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    VerifyOTPComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    RouterModule
  ],
  exports:[
    LoginComponent,
    SignupComponent,
    VerifyOTPComponent,
    RouterModule
  ]
})
export class SharedModule {}
