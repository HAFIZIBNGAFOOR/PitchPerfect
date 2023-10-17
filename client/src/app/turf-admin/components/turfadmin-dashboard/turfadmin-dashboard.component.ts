import { Component } from '@angular/core';
import { TurfAdminService } from '../../turf-admin-service/turf-admin.service';

@Component({
  selector: 'app-turfadmin-dashboard',
  templateUrl: './turfadmin-dashboard.component.html',
  styleUrls: ['./turfadmin-dashboard.component.css']
})
export class TurfadminDashboardComponent {
  constructor(private turfAdminService:TurfAdminService){}
  isLoggedIn!:boolean;


  ngOnInit(): void {
    if(this.turfAdminService.isLoggedIn()){
      this.isLoggedIn = true
    }
  }
  logout(event:string){
    console.log(event);
    if(event != 'user'){
      this.turfAdminService.logout()
    }
  }
 

}
