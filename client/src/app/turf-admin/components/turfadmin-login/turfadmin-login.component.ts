import { Component } from '@angular/core';
import { login } from '../../../user/components/user-login/user-login.component';
import { TurfAdminService } from '../../turf-admin-service/turf-admin.service';
import { Store } from '@ngrx/store';
import { turfAdminLogin, } from '../../state/turf-admin.action';
import { selectTurfAdminLoginError } from '../../state/turf-admin.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-turfadmin-login',
  templateUrl: './turfadmin-login.component.html',
  styleUrls: ['./turfadmin-login.component.css']
})
export class TurfadminLoginComponent {
    
  user:string='Turf Admin';
  loginData!:login;
  loginError!:string;

  constructor(private turfAdminService:TurfAdminService,private store:Store, private router:Router ){}
  
  getLoginData(data:login){
    this.loginData = data;   
    this.store.dispatch(turfAdminLogin({data:this.loginData}))
    this.store.select(selectTurfAdminLoginError).subscribe({
      next:(res)=>{
        this.loginError = res
      }
    })
  }
  ngOnInit(): void {
    if(this.turfAdminService.isLoggedIn()){
      this.router.navigate(['turf-owner'])
    }
  }
}
