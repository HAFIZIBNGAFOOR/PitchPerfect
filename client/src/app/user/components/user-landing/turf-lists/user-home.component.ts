import { Component } from '@angular/core';
import { UserService } from '../../../../user/service/user.service';
import { Location, SportsType } from '../../../../user/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MapboxService } from 'src/app/shared/mapbox-service/mapbox-service.service';
import { iTurfData } from 'src/app/user/models/turf.model';


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {
  location:Location={
    long:0,
    lat:0
  };
  userCity!:string; 
  turfDetails:any;
  filterByPrice: boolean = false;
  maxPrice!: number 
  minPrice!:number
  sportsType!:SportsType[];
  sports!:string[]
  toSearchSports!:string;
  sportsDimension!:any;
  toSearchDim!:string;
  noTurf :boolean = false

  constructor(private service :UserService , private http :HttpClient , private router:Router , private mapBoxService:MapboxService){}
     ngOnInit(): void {
      console.log('inside ngoninit');
      
      this.getLocation();
      this.service.getTurfDetails().subscribe({
        next:((val:any)=>{
          console.log(val);
          
          this.turfDetails = val.turfs
        })
      })
      this.service.getSportsTypes().subscribe({
        next:(val:any)=>{
          this.sportsType = val.sportsTypes
          this.sports = val.sportsTypes.map((res:any)=>res.sportsName)       
        }
      })
     }

  getSports(event:any){
      this.toSearchSports = event.value;
      this.toSearchDim = ''
      this.sportsDimension = this.sportsType.filter((res:any)=>res.sportsName == this.toSearchSports).map(res=>res.sportsDimensions).flat()
  } 

  getDimension(event:any){
      this.toSearchDim = event.value
  }
  onClear(){
      this.sportsDimension =[];
      this.toSearchSports = '';
      this.minPrice = 0;
      this.maxPrice =0
      this.service.getTurfDetails().subscribe({
        next:((val:any)=>{
          this.noTurf = false
          this.turfDetails = val.turfs
        })
      })
  }
  onApply(){
      this.service.searchTurf({sports:this.toSearchSports,dimension:this.toSearchDim,minPrice:this.minPrice,maxPrice:this.maxPrice}).subscribe({
        next: (res: any) => {
          this.noTurf = false;
          this.turfDetails = res.searchRes;
        },
        error: (err) => {
          this.noTurf = true
        }
      });
    }
  getLocation(){
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((pos:any)=>{
          if(pos){
            this.location.lat = pos.coords.latitude;
            this.location.long = pos.coords.longitude;
              this.mapBoxService.getAdress(this.location.long,this.location.lat).subscribe({
              next:(res:any)=>{ 
                this.userCity = res.features[0].context[2].text                   
              },
              error:(err:any)=> console.log(err)
            })
          }
        },
        (err:any)=> console.log(err)
        )
      }
    }
    getTurfData(data:any){
      const turfId = data._id
      this.router.navigate(['/book-turf/',turfId])
    }
  }
