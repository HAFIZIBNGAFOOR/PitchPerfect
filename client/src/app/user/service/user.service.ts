import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileResponse, UserProfile,UserData, SignUpResponse, VerifyOTPResponse, LoginResponse, FakeApiModel } from '../models/user.model';
import { Observable } from 'rxjs';
import { login } from '../components/user-login/user-login.component';
import { Router } from '@angular/router';
import { Slot } from '../models/slots.model';
import { Constants } from '../../config/constants';
import { iTurfData } from '../models/turf.model';
import {map} from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient,private router:Router , private API:Constants) {}

  userSingup(data:Observable<UserData|null>):Observable<SignUpResponse>{
    return this.http.post<SignUpResponse>(`${this.API.UserAPIEndPoint}/register`,data);
  }
  verifyUserBeforeOtp(phone:string):Observable<VerifyOTPResponse>{
    return this.http.post<VerifyOTPResponse>(`${this.API.UserAPIEndPoint}/verifyUser`,{phone});
  }
  userLogin(data:login):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.API.UserAPIEndPoint}/login`,data)
  }

  // getUserHome():Observable<any>{
  //   return this.http.get(`${this.API.UserAPIEndPoint}/home`)
  // }
  getSampleApi():Observable<FakeApiModel>{
    return this.http.get<FakeApiModel>(`https://jsonplaceholder.typicode.com/todos/1`).pipe(
      map((res:FakeApiModel)=>{
        console.log(res,'response from fake api model ');
        return res;
      })
    );
    
  }
  getTurfDetails():Observable<iTurfData>{
    console.log('inside the get turf  service ',this.API.UserAPIEndPoint);
    
    return this.http.get <iTurfData>(`${this.API.UserAPIEndPoint}/turf-lists`).pipe(
      map((res:iTurfData)=>{
        console.log(res,' this is response');
        return  res
      })
    )
  }
  getSportsTypes():Observable<any>{
      return this.http.get<any>(`${this.API.UserAPIEndPoint}/turfs-types`)
  }
  searchTurf(userData:any):Observable<any>{
    return this.http.post(`${this.API.UserAPIEndPoint}/search-turfs`,userData)
  }
  getTurfSlots(turfID:string):Observable<any>{
    return this.http.get(`${this.API.UserAPIEndPoint}/turf-slots/${turfID}`);
  }
  getProfile():Observable<ProfileResponse>{
    return this.http.get<ProfileResponse>(`${this.API.UserAPIEndPoint}/profile`);
  }
  updateProfile(data:UserProfile ):Observable<any>{
    return this.http.patch(`${this.API.UserAPIEndPoint}/updateProfile`,data)
  }
  postPayment(turfId:string,selectedSlots:any):Observable<any>{
    return this.http.post(`${this.API.UserAPIEndPoint}/checkout`,{turfId,selectedSlots})
  }
  getBookingDetails():Observable<any>{
    return this.http.get(`${this.API.UserAPIEndPoint}/booking-details`)
  }
  getSingleBooking(bookingId:string):Observable<any>{
    return this.http.get(`${this.API.UserAPIEndPoint}/single-booking/${bookingId}`)
  }
  updateBooking(bookingId:string):Observable<any>{
    return this.http.patch(`${this.API.UserAPIEndPoint}/cancel-booking`,{bookingId})
  }
  getLocation(turfId:string):Observable<any>{
    return this.http.get(`${this.API.UserAPIEndPoint}/get-location/${turfId}`)
  }
  userDetails():Observable<any>{
    return this.http.get(`${this.API.UserAPIEndPoint}/userDetails`);
  }
  getWalletDetails(turfId:string,slot:any):Observable<any>{
    return this.http.post(`${this.API.UserAPIEndPoint}/book-wallet`,{turfId,slot})
  }
  changeSlots(bookingId:string,newSlot:Slot):Observable<any>{
    return this.http.patch(`${this.API.UserAPIEndPoint}/update-slots`,{bookingId,newSlot})
  }
  isLoggedIn():boolean{
    let payload = this.getPayload()
    if(payload) return payload.exp > Date.now()/1000;
    else  return false
  }

  logout():void{
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
  setToken(token:string):void{
    localStorage.setItem('userToken',token);
  }
  getToken():string{
    return localStorage.getItem('userToken')as string;
  }
  getPayload():any{
   const token =this.getToken();
   if(token){
    let userPayload = atob(token.split('.')[1]);
    return JSON.parse(userPayload)
   }else return null
  }
} 
