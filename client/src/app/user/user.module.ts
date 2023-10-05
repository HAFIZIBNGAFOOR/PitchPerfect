import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule }  from '@angular/common/http';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserLandingComponent } from './user-landing/user-landing.component';

import { UserSignupComponent } from './user-signup/user-signup.component';
import { UserEffects } from './state/user.effects';
import { StoreModule } from '@ngrx/store';
import { MatToolbarModule } from '@angular/material/toolbar';
import { userReducer } from './state/user.reducer';
import { UserVerifyOtpComponent } from './user-verify-otp/user-verify-otp.component';
import { SharedModule } from '../shared/shared.module';
import { InterceptorInterceptor } from '../shared/interceptor/user-interceptor/interceptor.interceptor';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'

@NgModule({
  providers:[
    UserEffects,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:InterceptorInterceptor,
      multi:true
    },
  ],
  declarations: [
    UserLoginComponent,
    UserLandingComponent,
    UserSignupComponent,
    UserVerifyOtpComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule ,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    StoreModule.forFeature('user',userReducer)
  ]
})
export class UserModule { }
