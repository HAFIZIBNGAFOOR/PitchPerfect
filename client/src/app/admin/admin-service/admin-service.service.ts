import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminData } from '../admin-state/admin.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  url ='http://localhost:3001/admin';


  constructor(private http:HttpClient,private router:Router) { }

  adminLogin(data:AdminData){
    return this.http.post(`${this.url}/login`,data)
  }
  isAdminLoggedIn(){
    let payload = this.getAdminPayload();
    console.log(payload);
    if(payload) return payload.exp >Date.now()/1000
    else return false
  }
  getUsersList(){
    return this.http.get(`${this.url}/dashboard`)
  }
  logout(){
    localStorage.removeItem('AdminToken');
    this.router.navigate(['admin/login']);

  }
  setAdminToken(token:string){
    localStorage.setItem('AdminToken',token);
  }

  getAdminToken(){
    return localStorage.getItem('AdminToken')
  }

  getAdminPayload(){
    let token = this.getAdminToken() ;
    if(token){
      let adminPayload =  atob(token.split('.')[1])
      return JSON.parse(adminPayload)
    }
  }
}
