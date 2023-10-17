import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLandingComponent } from '../user/components/user-landing/user-landing.component';
import { UserLoginComponent } from '../user/components/user-login/user-login.component';
import { UserSignupComponent } from '../user/components/user-signup/user-signup.component';
import { UserVerifyOtpComponent } from '../user/components/user-verify-otp/user-verify-otp.component';
import {UserAuthGuard} from './service/userAuth-gaurd/user-auth-guard.service'
import { BookTurfComponent } from './components/user-landing/book-turf/book-turf.component';
import { UserHomeComponent } from './components/user-landing/user-home/user-home.component';

const routes: Routes = [
  {path:'home',component:UserLandingComponent,canActivate:[UserAuthGuard],
    children:[
      {path:'',component:UserHomeComponent},
      {path:'book-turf',component:BookTurfComponent}
    ]
  },
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'login',component:UserLoginComponent,},
  {path:'signup',component:UserSignupComponent},
  {path:'verify',component:UserVerifyOtpComponent},
  // {path:'book-turf'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
