import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurfAdminRoutingModule } from './turf-admin-routing.module';
import { TurfadminDashboardComponent } from './turfadmin-dashboard/turfadmin-dashboard.component';
import { TurfadminLoginComponent } from './turfadmin-login/turfadmin-login.component';
import { TurfadminSignupComponent } from './turfadmin-signup/turfadmin-signup.component';
import { SharedModule } from '../shared/shared.module';
import { TurfadminVerifyOtpComponent } from './turfadmin-verify-otp/turfadmin-verify-otp.component';
import { StoreModule } from '@ngrx/store';
import { turfadminReducer } from './state/turf-admin.reducer';
import { TurfAdminEffects } from './state/turf-admin.effects';
import { TurfAdminInterceptor } from '../shared/interceptor/turfAdmin-interceptor/turf-admin.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav'



@NgModule({
  providers:[
    TurfAdminEffects,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TurfAdminInterceptor,
      multi:true
    },
  ],
  declarations: [

    TurfadminLoginComponent,
    TurfadminSignupComponent,
    TurfadminDashboardComponent,
    TurfadminVerifyOtpComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    TurfAdminRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    StoreModule.forFeature('turfAdmin',turfadminReducer),

  ]
})
export class TurfAdminModule { }
