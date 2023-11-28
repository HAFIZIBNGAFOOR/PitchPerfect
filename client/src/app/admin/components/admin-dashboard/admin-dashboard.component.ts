import { Component } from '@angular/core';
import { AdminService } from '../../admin-service/admin-service.service';
import { NavItem } from '../../../shared/models/nav-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  currentNavItem! :string
  // navItem = NavItem
  constructor(private adminService:AdminService,private router:Router){}
  
  ngOnInit(): void {
    this.currentNavItem = NavItem.Dashboard

  }
  onNavItemClicked(navItem:string){
    this.currentNavItem = navItem ;
    let route!:string
    switch (navItem) {
      case 'UserManagement':
        route = 'admin/user-management'
        break;
      case 'TurfManagement':
        route = 'admin/turf-management'
        break ;
      case 'TurfUserManagement' :
        route = 'admin/turfAdmin-Management'
      break;
      case 'SportsManagement' :
        route = 'admin/sports-Management'
      break;
      case 'BookingManagement' :
        route = 'admin/booking-Management'
      break;
      default:
        route='admin'
        break;
    }
    this.router.navigate([route])
  }

  logout(){
    this.adminService.logout();
  }
}
