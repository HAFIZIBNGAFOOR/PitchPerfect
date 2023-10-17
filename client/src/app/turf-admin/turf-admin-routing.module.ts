import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurfadminLoginComponent } from '../turf-admin/components/turfadmin-login/turfadmin-login.component';
import { TurfadminSignupComponent } from '../turf-admin/components/turfadmin-signup/turfadmin-signup.component';
import { TurfadminDashboardComponent } from '../turf-admin/components/turfadmin-dashboard/turfadmin-dashboard.component';
import { TurfadminVerifyOtpComponent } from '../turf-admin/components/turfadmin-verify-otp/turfadmin-verify-otp.component';
import { AddTurfComponent } from './components/turfadmin-dashboard/turf-management/add-turf/add-turf.component';
import { TurfAdminGuard } from './turf-admin-service/turf-admin.guard';
import { TurfManagementComponent } from './components/turfadmin-dashboard/turf-management/turf-management.component';

const routes: Routes = [
  {path:'turf-owner',component:TurfadminDashboardComponent,canActivate:[TurfAdminGuard],
    children:[
      {path:'turf-management',component:TurfManagementComponent},
      {path:'turf-management/add-turf',component:AddTurfComponent}
    ]
  },
  {path:'turf-owner/dashboard',redirectTo:'turf-owner'},
  {path:'turf-owner/login',component:TurfadminLoginComponent},
  {path:'turf-owner/signup',component:TurfadminSignupComponent},
  {path:'turf-owner/verify',component:TurfadminVerifyOtpComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurfAdminRoutingModule { }
