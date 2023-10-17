import { Component } from '@angular/core';
import { AdminServiceService } from '../../admin-service/admin-service.service';
import { NavItem } from '../../admin-state/admin.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  currentNavItem! :string
  // navItem = NavItem
  constructor(private adminService:AdminServiceService,private router:Router){}
  
  ngOnInit(): void {
    this.currentNavItem = NavItem.Dashboard
    console.log(this.currentNavItem,' this is ng onint');
    
    this.adminService.getUsersList().subscribe(
      (res)=>console.log(res),
      err =>console.log(err)
    )
  }
  onNavItemClicked(navItem:string){
    this.currentNavItem = navItem ;
    let route!:string
    switch (navItem) {
      case 'UserManagement':
        route = 'admin/user-management'
        break;
      case 'TurfUserManagement' :
        route = 'admin/turfAdmin-Management'
      break;
      case 'SportsManagement' :
        route = 'admin/sports-Management'
      break
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
