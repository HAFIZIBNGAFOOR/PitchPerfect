import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminGuardService } from './admin-guard.service';

const routes: Routes = [
  {path:"admin/dashboard",component:AdminDashboardComponent,canActivate:[AdminGuardService]},
  {path:'admin',redirectTo:'admin/dashboard'},
  {path:'admin/login',component:AdminLoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
