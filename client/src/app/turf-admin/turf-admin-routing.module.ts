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
import { TurfHomeComponent } from './components/turfadmin-dashboard/turf-home/turf-home.component';
import { TurfProfileComponent } from './components/turfadmin-dashboard/turf-profile/turf-profile.component';
import { TurfWalletComponent } from './components/turfadmin-dashboard/turf-wallet/turf-wallet.component';

const routes: Routes = [
    {path:'',component:TurfadminDashboardComponent,
      children:[
        {path:'login',component:TurfadminLoginComponent},
        {path:'signup',component:TurfadminSignupComponent},
        {path:'verify',component:TurfadminVerifyOtpComponent},
        {path:'',component:TurfHomeComponent,canActivate:[TurfAdminGuard]},
        {path:"profile",component:TurfProfileComponent,canActivate:[TurfAdminGuard]},
        {path:'wallet',component:TurfWalletComponent,canActivate:[TurfAdminGuard]},
        {path:'turf-management',component:TurfManagementComponent,canActivate:[TurfAdminGuard]},
        {path:'turf-management/add-turf',component:AddTurfComponent,canActivate:[TurfAdminGuard]},
        {path:'manage-slots',component:AddSlotComponent,canActivate:[TurfAdminGuard]},
        {path:'manage-slots/add-slots/:turfId',component:SlotsComponent,canActivate:[TurfAdminGuard]},
        {path:'dashboard',redirectTo:'turf-owner'},
      ]
    },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurfAdminRoutingModule { }
