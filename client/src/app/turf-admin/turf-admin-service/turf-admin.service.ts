import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { TurfAdmin } from '../state/turf-admin.state';
import { Observable, catchError, from, map, throwError } from 'rxjs';
import { login } from '../../user/components/user-login/user-login.component';
import { Router } from '@angular/router';
import { TurfAdmin } from '../models/turf-admin.model';  
import { SlotData } from '../models/slot-management.model';
import { Constants } from '../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class TurfAdminService {

  constructor(private http :HttpClient,private router:Router , private turfAdminUrl :Constants) { }

  turfAdminSignup(data:Observable<TurfAdmin|null>):Observable<TurfAdmin>{
    return this.http.post<TurfAdmin>(`${this.turfAdminUrl.TurfOwnerAPIEndPoint}/register`,data)
  }

  verifyTurfAdminBeforeOTP(phone:string){
    return this.http.post<any[]>(`${this.turfAdminUrl.TurfOwnerAPIEndPoint}/verify`,{phone})
  }
  turfAdminLogin(data:login){
    return this.http.post(`${this.turfAdminUrl.TurfOwnerAPIEndPoint}/login`,data);
  }
  getSportsType(){
    return this.http.get(`${this.turfAdminUrl.TurfOwnerAPIEndPoint}/get-sports`)
  };
  getTurfs(){
    return this.http.get(`${this.turfAdminUrl.TurfOwnerAPIEndPoint}/turf-lists`).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }
  addTurf(turfData:FormData){
    return this.http.post(`${this.turfAdminUrl.TurfOwnerAPIEndPoint}/testingCloudinary`,turfData)
  };
  getSingleTurf(turfId:string){
    return this.http.get(`${this.turfAdminUrl.TurfOwnerAPIEndPoint}/getSingleTurf/${turfId}`)
  }
  getTurfTimeSlots(turfId:string ,date:string){
    return this.http.get(`${this.turfAdminUrl.TurfOwnerAPIEndPoint}/timeSlots/${turfId}/${date}`)
  }
  addSlots(formData:SlotData){
    return this.http.post(`${this.turfAdminUrl.TurfOwnerAPIEndPoint}/addSlots`,formData)
  }
  getTurfAdminDashboard(){
    return this.http.get(`${this.turfAdminUrl.TurfOwnerAPIEndPoint}/home`).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
      )
  }
  handleError(err:HttpErrorResponse): Observable<any>{
    console.log(err,' error ');
    return throwError('Something bad happened; please try again later.');

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
