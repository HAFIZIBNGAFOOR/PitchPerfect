import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule }  from '@angular/common/http';
import { UserLoginComponent } from '../user/components/user-login/user-login.component';
import { UserLandingComponent } from '../user/components/user-landing/user-landing.component';

import { UserSignupComponent } from '../user/components/user-signup/user-signup.component';
import { UserEffects } from './state/user.effects';
import { StoreModule } from '@ngrx/store';
import { MatToolbarModule } from '@angular/material/toolbar';
import { userReducer } from './state/user.reducer';
import { UserVerifyOtpComponent } from '../user/components//user-verify-otp/user-verify-otp.component';
import { SharedModule } from '../shared/shared.module';
import { InterceptorInterceptor } from '../shared/interceptor/user-interceptor/interceptor.interceptor';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { UserNavComponent } from '../shared/generics-components/navigationbar/user-nav.component';
import { BookTurfComponent } from './components/user-landing/book-turf/book-turf.component';
import { UserHomeComponent } from './components/user-landing/user-home/user-home.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';




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
    BookTurfComponent,
    UserHomeComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule ,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatGridListModule,
    FormsModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatSliderModule,
    MatSelectModule,
    StoreModule.forFeature('user',userReducer)
  ]
})
export class UserModule { }
