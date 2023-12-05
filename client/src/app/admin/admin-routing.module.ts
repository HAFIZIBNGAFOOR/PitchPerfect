import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from '../admin/components/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from '../admin/components/admin-login/admin-login.component';
import { AdminGuardService } from './admin-guard.service';
import { UserManagementComponent } from '../admin/components/admin-dashboard/user-management/user-management.component';
import { TurfAdminManagementComponent } from '../admin/components/admin-dashboard/turf-admin-management/turf-admin-management.component';
import { AdminHomeComponent } from './components/admin-dashboard/admin-home/admin-home.component';
import { SportsManagementComponent } from './components/admin-dashboard/sports-management/sports-management.component';
import { TurfDetailsComponent } from './components/admin-dashboard/turf-admin-management/turf-details/turf-details.component';
import { BookingsManagementComponent } from './components/admin-dashboard/bookings-management/bookings-management.component';
import { SingleBookingDetailsComponent } from './components/admin-dashboard/bookings-management/single-booking-details/single-booking-details.component';
import { TurfManagementComponent } from './components/admin-dashboard/turf-management/turf-management.component';

const routes: Routes = [
  {path:"",component:AdminDashboardComponent,canActivate:[AdminGuardService],
   children:[
    {path:'',component:AdminHomeComponent},
    {path:'user-management',component:UserManagementComponent},
    {path:'turfAdmin-Management',component:TurfAdminManagementComponent},
    {path:'turf-details/:turfId',component:TurfDetailsComponent},
    {path:'turf-management',component:TurfManagementComponent},
    {path:'sports-Management',component:SportsManagementComponent},
    {path:'booking-Management',component:BookingsManagementComponent},
    {path:'booking-details/:bookingId',component:SingleBookingDetailsComponent},
   ]
  },
  {path:'login',component:AdminLoginComponent},
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
