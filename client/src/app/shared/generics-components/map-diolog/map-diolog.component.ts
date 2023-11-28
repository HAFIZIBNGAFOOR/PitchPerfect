import { Component } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {  MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MapboxService } from '../../mapbox-service/mapbox-service.service';

@Component({
  selector: 'app-map-diolog',
  templateUrl: './map-diolog.component.html',
  styleUrls: ['./map-diolog.component.css']
})
export class MapDiologComponent {
  private map! :mapboxgl.Map;
  // private mapBoxDirection !: mapboxgl
  selectedLocation!:{
    longitude:string,
    latitude:string
  };
  selectedAddres!:string;
  // @Output() Address = new EventEmitter();

  constructor(  private dialogRef: MatDialogRef<any>,private http: HttpClient, private mapBoxService:MapboxService){}

  ngOnInit() {
    this.initializeMap();
  }

  initializeMap(): void {
     this.map = new mapboxgl.Map({
        container:'map-container',
        style:'mapbox://styles/mapbox/streets-v11',
        center:[77.5946 ,12.9716],
        zoom:9,
        accessToken:'pk.eyJ1IjoiaGFmaXphaG1lZCIsImEiOiJjbHA3dTR6aHcyZnFiMmlubDl5Nmk4czg0In0.ovDRjWjrKqgwPu7tMeZq9w'
      })
    this.map.on('click',(event)=>{
      const cordinates = event.lngLat;
      this.selectedLocation = {longitude : `${cordinates.lng}`, latitude: `${cordinates.lat}`}
      console.log(this.selectedLocation);
     this.mapBoxService.getAdress(cordinates.lng,cordinates.lat).subscribe({
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
