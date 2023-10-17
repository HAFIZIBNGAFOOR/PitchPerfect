import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {  MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map-diolog',
  templateUrl: './map-diolog.component.html',
  styleUrls: ['./map-diolog.component.css']
})
export class MapDiologComponent {
  private map! :mapboxgl.Map;
  selectedLocation!:{
    longitude:string,
    latitude:string
  };
  selectedAddres!:string;
  // @Output() Address = new EventEmitter();

  constructor(  private dialogRef: MatDialogRef<any>,private http: HttpClient){}

  ngOnInit() {
    this.initializeMap();
  }

  initializeMap(): void {
     this.map = new mapboxgl.Map({
        container:'map-container',
        style:'mapbox://styles/mapbox/streets-v11',
        center:[77.5946 ,12.9716],
        zoom:9,
        accessToken:'pk.eyJ1IjoiaGFmaXphaG1lZCIsImEiOiJjbG5temFpMXkwMTVmMmxvNTJrOWdjN2h1In0.NMjcL65Xu2i8lQGSuUsuGg'
      })
    this.map.on('click',(event)=>{
      const cordinates = event.lngLat;
      this.selectedLocation = {longitude : `${cordinates.lng}`, latitude: `${cordinates.lat}`}
      console.log(this.selectedLocation);
      this.http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${cordinates.lng}, ${cordinates.lat}.json?types=address&access_token=pk.eyJ1IjoiaGFmaXphaG1lZCIsImEiOiJjbG5temFpMXkwMTVmMmxvNTJrOWdjN2h1In0.NMjcL65Xu2i8lQGSuUsuGg`).subscribe({
        next:(res:any)=>{
          console.log(res.features[0].place_name,' this is addrss')
          this.selectedAddres = res.features[0].place_name
          this.dialogRef.close([this.selectedLocation,this.selectedAddres])
        }
      })

    })
    this.map.addControl(new mapboxgl.NavigationControl());
  } 

}
