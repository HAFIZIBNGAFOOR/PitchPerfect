import { Component } from '@angular/core';
import { UserService } from 'src/app/user/service/user.service';
import { SportsType } from 'src/app/user/state/user.interface';


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {
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

  constructor(private service:UserService){}
     ngOnInit(): void {
      this.service.getTurfDetails().subscribe({
        next:((val:any)=>{
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
      this.sportsDimension = this.sportsType.filter((res:any)=>res.sportsName ==this.toSearchSports).map(res=>res.sportsDimensions).flat()
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
  }
