import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminData, Sports } from '../admin-state/admin.interface';
import { Router } from '@angular/router';
import { Constants } from '../../config/constants'
import { iTurfData } from 'src/app/user/models/turf.model';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  constructor(private http:HttpClient,private router:Router ,private adminUrl:Constants) { }

adminLogin(data:AdminData){
    return this.http.post(`${this.adminUrl.AdminAPIEndPoint}/login`,data)
}
isAdminLoggedIn(){
    const payload = this.getAdminPayload();
    if(payload) return payload.exp >Date.now()/1000
    else return false
}
getUsersList(){
    return this.http.get(`${this.adminUrl.AdminAPIEndPoint}/users`)
}
getTurfAdminsData(){
    return this.http.get(`${this.adminUrl.AdminAPIEndPoint}/turfAdminData`)
}
blockOrUnblockUser(userId:string){
    return this.http.post(`${this.adminUrl.AdminAPIEndPoint}/blockUnblock`,{userId})
}
verifyTurfAdmin(turfAdminId:string){
    return this.http.post(`${this.adminUrl.AdminAPIEndPoint}/verifyTurfAdmin`,{turfAdminId})
}
addSports(sportsData:Sports){
    return this.http.post(`${this.adminUrl.AdminAPIEndPoint}/addSports`,sportsData)
}
getSingleTurf(id:string){
    return this.http.post(`${this.adminUrl.AdminAPIEndPoint}/getTurfAdmin`,{id});
}
getSportsList(){
  return this.http.get(`${this.adminUrl.AdminAPIEndPoint}/getSports`)
}
getBookingDetails(){
    return this.http.get(`${this.adminUrl.AdminAPIEndPoint}/get-bookings`)
}
getDashboardDetails(){
    return this.http.get(`${this.adminUrl.AdminAPIEndPoint}/dashboard`)
}
getTurfLists():Observable<iTurfData[]>{
    return this.http.get<iTurfData[] >(`${this.adminUrl.AdminAPIEndPoint}/get-turfs`)
}
blockOrunblockTurf(turfId:string):Observable<iTurfData[]>{
    return this.http.patch<iTurfData[]>(`${this.adminUrl.AdminAPIEndPoint}/blockUnblock-turf`,{turfId})
}
getSingleBooking(bookingId:string):Observable<iTurfData>{
    return this.http.get<iTurfData>(`${this.adminUrl.AdminAPIEndPoint}/single-booking/${bookingId}`)
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
    const token = this.getAdminToken() ;
    if(token){
      let adminPayload =  atob(token.split('.')[1])
      return JSON.parse(adminPayload)
    }
  }
}
