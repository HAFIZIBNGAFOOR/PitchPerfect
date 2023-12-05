import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  constructor(private http : HttpClient) { }

  getDirection(start:any,end:any){
    console.log(start , end);
    return this.http.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${start};${end}?access_token=pk.eyJ1IjoiaGFmaXphaG1lZCIsImEiOiJjbHA3dTR6aHcyZnFiMmlubDl5Nmk4czg0In0.ovDRjWjrKqgwPu7tMeZq9w`)
  }
  getAdress(long:number,lat:number){
    return  this.http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long}, ${lat}.json?types=address&access_token=pk.eyJ1IjoiaGFmaXphaG1lZCIsImEiOiJjbHA3dTR6aHcyZnFiMmlubDl5Nmk4czg0In0.ovDRjWjrKqgwPu7tMeZq9w`)
  }
 
}
