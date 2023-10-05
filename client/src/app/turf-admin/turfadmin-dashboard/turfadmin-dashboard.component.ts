import { Component } from '@angular/core';
import { TurfAdminService } from '../turf-admin-service/turf-admin.service';

@Component({
  selector: 'app-turfadmin-dashboard',
  templateUrl: './turfadmin-dashboard.component.html',
  styleUrls: ['./turfadmin-dashboard.component.css']
})
export class TurfadminDashboardComponent {
  constructor(private turfAdminService:TurfAdminService){}
  

  logout(){
    this.turfAdminService.logout()
  }
}
