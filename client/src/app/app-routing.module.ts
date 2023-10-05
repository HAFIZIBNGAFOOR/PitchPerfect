import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLandingComponent } from './user/user-landing/user-landing.component';
import { UserAuthGuard } from './user/service/userAuth-gaurd/user-auth-guard.service';

const routes: Routes = [
  // {path:"",component:UserLandingComponent,canActivate:[UserAuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
