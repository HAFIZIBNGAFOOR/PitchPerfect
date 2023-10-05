import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLandingComponent } from './user-landing/user-landing.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { UserVerifyOtpComponent } from './user-verify-otp/user-verify-otp.component';
import {UserAuthGuard} from './service/userAuth-gaurd/user-auth-guard.service'

const routes: Routes = [
  {path:'',component:UserLandingComponent,canActivate:[UserAuthGuard]},
  {path:'home',redirectTo:''},
  {path:'login',component:UserLoginComponent,},
  {path:'signup',component:UserSignupComponent},
  {path:'verify',component:UserVerifyOtpComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
