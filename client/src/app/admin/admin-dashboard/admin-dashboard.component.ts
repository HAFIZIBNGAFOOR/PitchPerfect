import { Component } from '@angular/core';
import { AdminServiceService } from '../admin-service/admin-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {


  constructor(private adminService:AdminServiceService){}
  
  ngOnInit(): void {
    this.adminService.getUsersList().subscribe(
      (res)=>console.log(res),
      err =>console.log(err)
    )
  }
  logout(){
    this.adminService.logout();
  }
}
