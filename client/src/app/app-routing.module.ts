import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from './user/service/userAuth-gaurd/user-auth-guard.service';
import { IsBlockedComponent } from './shared/generics-components/is-blocked/is-blocked.component';
import { AdminGuardService } from './admin/admin-guard.service';
import { TurfAdminGuard } from './turf-admin/turf-admin-service/turf-admin.guard';
import { UserHomeComponent } from './user/components/user-landing/turf-lists/user-home.component';
import { AdminDashboardComponent } from './admin/components/admin-dashboard/admin-dashboard.component';
import { TurfadminDashboardComponent } from './turf-admin/components/turfadmin-dashboard/turfadmin-dashboard.component';
import { UserLandingComponent } from './user/components/user-landing/user-landing.component';


const routes: Routes = [
  {path:'',component:UserLandingComponent,loadChildren:()=>import('../app/user/user.module').then(m=>m.UserModule)},
  {path:'admin',loadChildren:()=>import('../app/admin/admin.module').then(m=>m.AdminModule)},
  {path:'turf-owner',loadChildren:()=>import('../app/turf-admin/turf-admin.module').then(m=>m.TurfAdminModule)},
  // {path:"blocked",component:IsBlockedComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
