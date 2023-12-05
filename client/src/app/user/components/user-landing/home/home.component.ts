import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { iTurfData } from 'src/app/user/models/turf.model';
import { UserService } from 'src/app/user/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  turfData!:iTurfData
  turfSubscription!:Subscription
  constructor(private userService:UserService){

  }
  ngOnInit(): void {
   this.turfSubscription =  this.userService.getTurfDetails().subscribe({
      next:(res:any)=>{
        this.turfData = res.turfs
      }
    })
  }
  ngOnDestroy(): void {
      this.turfSubscription.unsubscribe()
  }
}
