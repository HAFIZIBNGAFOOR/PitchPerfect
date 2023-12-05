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
import { HTTP_INTERCEPTORS ,HttpClientModule } from '@angular/common/http';
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
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';


import { AddTurfComponent } from './components/turfadmin-dashboard/turf-management/add-turf/add-turf.component';
import { TurfManagementComponent } from './components/turfadmin-dashboard/turf-management/turf-management.component';
import { TurfDetailsComponent } from '../admin/components/admin-dashboard/turf-admin-management/turf-details/turf-details.component';
import { AddSlotComponent } from './components/turfadmin-dashboard/turf-management/add-slot/add-slot.component';
import { SlotsComponent } from './components/turfadmin-dashboard/turf-management/add-slot/slots/slots.component'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Constants } from '../config/constants';
import { TurfAdminService } from './turf-admin-service/turf-admin.service';
import { TurfHomeComponent } from './components/turfadmin-dashboard/turf-home/turf-home.component';
import { TurfProfileComponent } from './components/turfadmin-dashboard/turf-profile/turf-profile.component';
import { TurfWalletComponent } from './components/turfadmin-dashboard/turf-wallet/turf-wallet.component';



@NgModule({
  providers:[
    TurfAdminEffects,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TurfAdminInterceptor,
      multi:true
    },
    TurfAdminService 
  ],
  declarations: [

    TurfadminLoginComponent,
    TurfadminSignupComponent,
    TurfadminDashboardComponent,
    TurfadminVerifyOtpComponent,
    AddTurfComponent,
    TurfManagementComponent,
    TurfDetailsComponent,
    AddSlotComponent,
    SlotsComponent,
    TurfHomeComponent,
    TurfProfileComponent,
    TurfWalletComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    TurfAdminRoutingModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    // BrowserAnimationsModule,
    MatSidenavModule,
    MatExpansionModule,
    MatInputModule,
    FlexLayoutModule,
    MatDialogModule ,
    MatSelectModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSnackBarModule ,
    MatMenuModule,
    ReactiveFormsModule, 
    StoreModule.forFeature('turfAdmin',turfadminReducer),

  ]
})
export class TurfAdminModule { }
