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
  onNavItemClicked(){
    this.router.navigate(['/admin'])
  }

  logout(){
    this.adminService.logout();
  }
}
