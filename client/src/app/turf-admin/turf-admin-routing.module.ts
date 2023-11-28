import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurfadminLoginComponent } from '../turf-admin/components/turfadmin-login/turfadmin-login.component';
import { TurfadminSignupComponent } from '../turf-admin/components/turfadmin-signup/turfadmin-signup.component';
import { TurfadminDashboardComponent } from '../turf-admin/components/turfadmin-dashboard/turfadmin-dashboard.component';
import { TurfadminVerifyOtpComponent } from '../turf-admin/components/turfadmin-verify-otp/turfadmin-verify-otp.component';
import { AddTurfComponent } from './components/turfadmin-dashboard/turf-management/add-turf/add-turf.component';
import { TurfAdminGuard } from './turf-admin-service/turf-admin.guard';
import { TurfManagementComponent } from './components/turfadmin-dashboard/turf-management/turf-management.component';
import { AddSlotComponent } from './components/turfadmin-dashboard/turf-management/add-slot/add-slot.component';
import { SlotsComponent } from './components/turfadmin-dashboard/turf-management/add-slot/slots/slots.component';

const routes: Routes = [
    {path:'',component:TurfadminDashboardComponent,canActivate:[TurfAdminGuard],
      children:[
        {path:'turf-management',component:TurfManagementComponent},
        {path:'turf-management/add-turf',component:AddTurfComponent},
        {path:'manage-slots',component:AddSlotComponent},
        {path:'manage-slots/add-slots/:turfId',component:SlotsComponent},
        {path:'dashboard',redirectTo:'turf-owner'},
      ]
    },
    {path:'login',component:TurfadminLoginComponent},
    {path:'signup',component:TurfadminSignupComponent},
    {path:'verify',component:TurfadminVerifyOtpComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurfAdminRoutingModule { }
