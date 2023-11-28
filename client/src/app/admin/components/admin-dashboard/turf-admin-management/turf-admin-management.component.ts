import { Component } from '@angular/core';
import { ColumnType } from '../../../../shared/models/shared-model';
import { UsersType } from '../../../admin-state/admin.interface';
import { AdminService } from '../../../admin-service/admin-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-turf-admin-management',
  templateUrl: './turf-admin-management.component.html',
  styleUrls: ['./turf-admin-management.component.css']
})
export class TurfAdminManagementComponent {
  turfAdminData!:UsersType;
  initialised:boolean=false;
  error :any ;
  turfId!:string
  columnData:ColumnType={
    columns:[
      {title:'Name',dataProperty:'userName',sortable:false,filterable:false},
      {title:'Email',dataProperty:'email',sortable:false,filterable:false},
      {title:'Phone',dataProperty:'phone',sortable:false,filterable:false},
      {title:'Actions',dataProperty:'actions',sortable:false,filterable:false},
    ],
    rowActions:[
      {label:"Verification", dataProperty:"isVerified",actionIdtoReturn:''},
    ],
    rowsPerPage:'3'
  };


  constructor(private adminService:AdminService, private router:Router ){}
  ngOnInit(): void {
    this.adminService.getTurfAdminsData().subscribe({
      next:(res:any)=>{
        const turfAdminType = res.turfAdminData.map((user:any)=>({
          userName :user.turfAdminName,
          email:user.email,
          phone:user.phone,
          id:user._id,
          isVerified:user.isVerified ? 'Verified': 'Verify',
          actions:'View'
        }))
        this.turfAdminData = turfAdminType
        this.initialised = true
        console.log(this.turfAdminData,turfAdminType);        
      },
      error:(err)=>{
        this.error = err;
      }
    })
  }
  
getTableAction(event:any){
  console.log(event.id,' this is event');
  this.turfId = event.id
  this.router.navigate(['admin/turf-details',this.turfId])
}

}
