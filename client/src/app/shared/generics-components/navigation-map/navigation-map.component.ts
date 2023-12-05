import { Component, Inject } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as polyline from '@mapbox/polyline';
import {  MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Position } from '../../models/shared-model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/user/service/user.service';
import { MapboxService } from '../../mapbox-service/mapbox-service.service';


@Component({
  selector: 'app-navigation-map',
  templateUrl: './navigation-map.component.html',
  styleUrls: ['./navigation-map.component.css']
})
export class NavigationMapComponent {
  // private directions !:mapboxgl
  private map ! :mapboxgl.Map;
  startLocation:{
    longitude:number,
    latitude:number
  }={longitude:0, latitude:0};
  endLocation:{
    longitude:number,
    latitude:number
  } ={longitude:0, latitude:0};;
  selectedAddres!:string;
  routeGeometry:any
  distance !:number
  turfName!:string;
  userLocationName!:string;

  constructor(private dialogRef: MatDialogRef<any>,private http: HttpClient ,@Inject(MAT_DIALOG_DATA) public data: any, private userService:UserService ,private mapBoxService:MapboxService){}

  ngOnInit() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((pos:any)=>{
          if(pos){
            console.log(pos);
            this.startLocation.latitude = pos.coords.latitude;
            this.startLocation.longitude = pos.coords.longitude;
            this.userService.getLocation(this.data.turfId).subscribe({
              next:(res:any)=>{
                this.endLocation.latitude = res.location.lat,
                this.endLocation.longitude = res.location.long
                this.turfName = res.turf as string
                this.initializeMap(this.startLocation.longitude,this.startLocation.latitude);
                this.map.on('load', () => {
                  console.log('Map loaded');
                  this.mapBoxService.getDirection(`${this.startLocation.longitude} ,${this.startLocation.latitude}`,`${this.endLocation.longitude},${this.endLocation.latitude}`).subscribe({
                      next:(res:any)=>{
                        this.routeGeometry = res.routes[0].geometry
                        this.distance =(res.routes[0].legs[0].distance)/1000;
                        const routeCoordinates = polyline.decode(this.routeGeometry).map((point) => [point[1], point[0]]) as Position[]
                        console.log(routeCoordinates,' this is route coordinates ');
                          this.map.addSource('route', {
                            type: 'geojson',
                            data: {
                              type: 'Feature',
                              properties: {},
                              geometry: {
                                type: 'LineString',
                                coordinates: routeCoordinates,
                              },
                            },
                          });
                          this.map.addLayer({
                            id: 'route',
                            type: 'line',
                            source:'route',
                            layout: {
                              'line-join': 'round',
                              'line-cap': 'round',
                            },
                            paint: {
                              'line-color': 'black',
                              'line-width': 4,
                              'line-opacity': 0.75,
                            },
                          });
                          const bounds = new mapboxgl.LngLatBounds()
                          routeCoordinates.forEach((coord:any)=>bounds.extend(coord))
                          this.map.fitBounds(bounds,{padding:20})
                              new mapboxgl.Marker().setLngLat(routeCoordinates[0]).addTo(this.map);
                              new mapboxgl.Marker().setLngLat(routeCoordinates[routeCoordinates.length-1]).addTo(this.map)
                              new mapboxgl.Popup().setLngLat(routeCoordinates[routeCoordinates.length-1]).setHTML(`<h3>${this.turfName }</h3>`).addTo(this.map);
                              new mapboxgl.Popup().setLngLat(routeCoordinates[0]).setHTML(`<h3>'Your Location'</h3>`).addTo(this.map);
                    }
                  })
                })
              }
            })
          }
        })
    }    ;
  }
  initializeMap(long:number,lat:number){
    this.map = new mapboxgl.Map({
      container:'map-container',
      style:'mapbox://styles/mapbox/streets-v11',
      center:[long, lat],
      zoom:9,
      accessToken:"pk.eyJ1IjoiaGFmaXphaG1lZCIsImEiOiJjbHA3dTR6aHcyZnFiMmlubDl5Nmk4czg0In0.ovDRjWjrKqgwPu7tMeZq9w",
    })
    this.map.addControl(new mapboxgl.NavigationControl(),'top-left');

  }

}
