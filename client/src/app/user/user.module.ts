import { NgModule,  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule }  from '@angular/common/http';
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
import { BookTurfComponent } from './components/user-landing/book-turf/book-turf.component';
import { UserHomeComponent } from './components/user-landing/turf-lists/user-home.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './components/user-landing/home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { RouterLinkActive } from '@angular/router';

import { UserProfileComponent } from './components/user-landing/user-profile/user-profile.component';
import { UserDetailComponent } from './components/user-landing/user-profile/user-detail/user-detail.component';
import { PaymentSuccessComponent } from './components/user-landing/book-turf/payment-success/payment-success.component';
import { PaymentFailedComponent } from './components/user-landing/book-turf/payment-failed/payment-failed.component';
import { UserOrdersComponent } from './components/user-landing/user-profile/user-bookings/user-orders.component';
import { BookingDetailsComponent } from './components/user-landing/user-profile/user-bookings/booking-details/booking-details.component';
import { ChangeSlotsComponent } from './components/user-landing/user-profile/user-bookings/booking-details/change-slots/change-slots.component';
import { WalletComponent } from './components/user-landing/user-profile/wallet/wallet.component';
import { Constants } from '../config/constants';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from './service/user.service';





@NgModule({
  providers:[
    UserEffects,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:InterceptorInterceptor,
      multi:true
    },
    UserService 
  ],
  declarations: [
    UserLoginComponent,
    UserLandingComponent,
    UserSignupComponent,
    UserVerifyOtpComponent,
    BookTurfComponent,
    UserHomeComponent,
    HomeComponent,
    UserProfileComponent,
    UserDetailComponent,
    PaymentSuccessComponent,
    PaymentFailedComponent,
    UserOrdersComponent,
    BookingDetailsComponent,
    ChangeSlotsComponent,
    WalletComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatGridListModule,
    FormsModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatSliderModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatTabsModule,
    MatListModule,
    MatTableModule,
    UserRoutingModule,
    RouterLinkActive,
    StoreModule.forFeature('user',userReducer)
  ],
  schemas:[ CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule { }
