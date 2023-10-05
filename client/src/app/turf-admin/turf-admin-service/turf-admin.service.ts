import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TurfAdmin } from '../state/turf-admin.state';
import { Observable } from 'rxjs';
import { login } from 'src/app/user/user-login/user-login.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TurfAdminService {
   url = 'http://localhost:3001/turfAdmin';


  constructor(private http :HttpClient,private router:Router) { }

  turfAdminSignup(data:Observable<TurfAdmin|null>){
    return this.http.post(`${this.url}/register`,data)
  }

  verifyTurfAdminBeforeOTP(phone:string){
    return this.http.post(`${this.url}/verify`,{phone})
  }
  turfAdminLogin(data:login){
    console.log('inside the login of turf admin login service');
    
    return this.http.post(`${this.url}/login`,data);
  }

  isLoggedIn(){
    let payload = this.getPayload();
    if(payload){
      return payload.exp > Date.now()/1000
    }else return false
  }
  setToken(token:string){
    localStorage.setItem('TurfAdminToken',token);
  }
  getToken(){
   return localStorage.getItem('TurfAdminToken');
  }
  getPayload(){
    let token = this.getToken();
    if(token){
      const payload =  atob(token.split('.')[1]);
      return JSON.parse(payload)
    }else return null

  }
  logout(){
    localStorage.removeItem('TurfAdminToken');
    this.router.navigate(['/turf-owner/login'])
  }
}
