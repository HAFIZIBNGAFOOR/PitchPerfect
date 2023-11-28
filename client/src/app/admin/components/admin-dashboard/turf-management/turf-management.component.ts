import { Component } from '@angular/core';
import { AdminService } from 'src/app/admin/admin-service/admin-service.service';
import { iTurfData } from 'src/app/user/models/turf.model';

@Component({
  selector: 'app-turf-management',
  templateUrl: './turf-management.component.html',
  styleUrls: ['./turf-management.component.css']
})
export class TurfManagementComponent {
  turfData!:iTurfData;

  constructor(private adminService:AdminService){}

  ngOnInit(): void {
    this.adminService.getTurfLists().subscribe({
      next:(res:iTurfData)=>{
        console.log(res);
        this.turfData = res;
      }
    })
  }
}
