import { Component } from '@angular/core';
import { login } from 'src/app/user/user-login/user-login.component';
import { TurfAdminService } from '../turf-admin-service/turf-admin.service';
import { Store } from '@ngrx/store';
import { turfAdminLogin, turfAdminLoginFailed, turfAdminLoginSuccess } from '../state/turf-admin.action';

@Component({
  selector: 'app-turfadmin-login',
  templateUrl: './turfadmin-login.component.html',
  styleUrls: ['./turfadmin-login.component.css']
})
export class TurfadminLoginComponent {
    
  user:string='Turf Admin';
  loginData!:login;

  constructor(private turfAdminService:TurfAdminService,private store:Store){}

  getLoginData(data:login){
    this.loginData = data;
    console.log('its inside the get login data in turf adminlogin', this.loginData);    
    this.store.dispatch(turfAdminLogin({data:this.loginData}))
  }
}
