import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { NgOtpInputModule } from 'ng-otp-input';


import { SharedModule } from '../shared/shared.module';
import { AdminLoginComponent } from '../admin/components/admin-login/admin-login.component';
import { AdminDashboardComponent } from '../admin/components/admin-dashboard/admin-dashboard.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdminEffects } from './admin-state/admin.effects';
import { StoreModule } from '@ngrx/store';
import { adminReducer } from './admin-state/admin.reducer';
import { InterceptorInterceptor } from '../shared/interceptor/user-interceptor/user.interceptor';
import { AdminInterceptor } from '../shared/interceptor/admin-interceptor/admin.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { UserManagementComponent } from '../admin/components/admin-dashboard/user-management/user-management.component';
import { TurfAdminManagementComponent } from '../admin/components/admin-dashboard/turf-admin-management/turf-admin-management.component';
import { AdminHomeComponent } from './components/admin-dashboard/admin-home/admin-home.component';
import { SportsManagementComponent } from './components/admin-dashboard/sports-management/sports-management.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BookingsManagementComponent } from './components/admin-dashboard/bookings-management/bookings-management.component';
import { SingleBookingDetailsComponent } from './components/admin-dashboard/bookings-management/single-booking-details/single-booking-details.component';
import { MatIconModule } from '@angular/material/icon';
import { Constants } from '../config/constants';
import { AdminRoutingModule } from './admin-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AdminService } from './admin-service/admin-service.service';
import { TurfManagementComponent } from './components/admin-dashboard/turf-management/turf-management.component';
import { RouterModule } from '@angular/router';




@NgModule({
  providers:[
    AdminEffects,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AdminInterceptor,
      multi:true
    },
    // Constants
    AdminService
  ],
  declarations:[
    AdminDashboardComponent,
    AdminLoginComponent,
    UserManagementComponent,
    TurfAdminManagementComponent,
    AdminHomeComponent,
    SportsManagementComponent,
    BookingsManagementComponent,
    SingleBookingDetailsComponent,
    TurfManagementComponent
  ],
  imports: [
    // BrowserModule,
    CommonModule,
    SharedModule,
    HttpClientModule,
    AdminRoutingModule,
    StoreModule.forFeature('admin',adminReducer),
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    RouterModule,
    // BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule
  ]
})
export class AdminModule { }
