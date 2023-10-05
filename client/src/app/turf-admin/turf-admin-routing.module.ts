import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurfadminLoginComponent } from './turfadmin-login/turfadmin-login.component';
import { TurfadminSignupComponent } from './turfadmin-signup/turfadmin-signup.component';
import { TurfadminDashboardComponent } from './turfadmin-dashboard/turfadmin-dashboard.component';
import { TurfadminVerifyOtpComponent } from './turfadmin-verify-otp/turfadmin-verify-otp.component';

const routes: Routes = [
  {path:'turf-owner',component:TurfadminDashboardComponent},
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
