import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurfAdminRoutingModule } from './turf-admin-routing.module';
import { TurfadminDashboardComponent } from '../turf-admin/components/turfadmin-dashboard/turfadmin-dashboard.component';
import { TurfadminLoginComponent } from '../turf-admin/components/turfadmin-login/turfadmin-login.component';
import { TurfadminSignupComponent } from '../turf-admin/components/turfadmin-signup/turfadmin-signup.component';
import { SharedModule } from '../shared/shared.module';
import { TurfadminVerifyOtpComponent } from '../turf-admin/components/turfadmin-verify-otp/turfadmin-verify-otp.component';
import { StoreModule } from '@ngrx/store';
import { turfadminReducer } from './state/turf-admin.reducer';
import { TurfAdminEffects } from './state/turf-admin.effects';
import { TurfAdminInterceptor } from '../shared/interceptor/turfAdmin-interceptor/turf-admin.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';




import { AddTurfComponent } from './components/turfadmin-dashboard/turf-management/add-turf/add-turf.component';
import { TurfManagementComponent } from './components/turfadmin-dashboard/turf-management/turf-management.component'



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
    AddTurfComponent,
    TurfManagementComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    TurfAdminRoutingModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatInputModule,
    FlexLayoutModule,
    MatDialogModule ,
    MatSelectModule, 
    ReactiveFormsModule , 
    StoreModule.forFeature('turfAdmin',turfadminReducer),

  ]
})
export class TurfAdminModule { }
