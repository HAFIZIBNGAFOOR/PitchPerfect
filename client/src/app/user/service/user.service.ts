import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from '../state/user.interface';
import { Observable } from 'rxjs';
import { login } from '../components/user-login/user-login.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url ='http://localhost:3001'
  constructor(private http:HttpClient,private router:Router) {}

  userSingup(data:Observable<UserData|null>){
    console.log(data);
    return this.http.post(`${this.url}/register`,data);
  }
  verifyUserBeforeOtp(phone:string){
    console.log(phone);
    return this.http.post(`${this.url}/verifyUser`,{phone});
  }
  userLogin(data:login){
    return this.http.post(`${this.url}/login`,data);
  }

  getUserHome(){
    return this.http.get(`${this.url}/home`)
  }
  getTurfDetails(){
    return this.http.get(`${this.url}/turf-lists`)
  }
  getSportsTypes(){
      return this.http.get(`${this.url}/turfs-types`)
  }
  searchTurf(userData:any){
    return this.http.post(`${this.url}/search-turfs`,userData)
  }
  isLoggedIn():boolean{
    let payload = this.getPayload()
    if(payload) return payload.exp > Date.now()/1000;
    else  return false
  }

  logout(){
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
  setToken(token:string){
    localStorage.setItem('userToken',token);
  }
  getToken(){
    return localStorage.getItem('userToken');
  }
  getPayload(){
   const token =this.getToken();
   if(token){
    let userPayload = atob(token.split('.')[1]);
    return JSON.parse(userPayload)
   }
  }
} 
