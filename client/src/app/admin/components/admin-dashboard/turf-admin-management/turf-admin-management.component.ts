import { Component } from '@angular/core';
import { ColumnType } from 'src/app/shared/interface/interface';
import { UsersType } from '../../../admin-state/admin.interface';
import { TurfAdminService } from 'src/app/turf-admin/turf-admin-service/turf-admin.service';
import { AdminServiceService } from '../../../admin-service/admin-service.service';

@Component({
  selector: 'app-turf-admin-management',
  templateUrl: './turf-admin-management.component.html',
  styleUrls: ['./turf-admin-management.component.css']
})
export class TurfAdminManagementComponent {
  turfAdminData!:UsersType;
  initialised:boolean=false;
  columnData:ColumnType={
    columns:[
      {title:'Name',dataProperty:'userName',sortable:false,filterable:false},
      {title:'Email',dataProperty:'email',sortable:false,filterable:false},
      {title:'Phone',dataProperty:'phone',sortable:false,filterable:false},

    ],
    rowActions:[
      {label:"Verification", dataProperty:"isVerified",actionIdtoReturn:''},
    ],
    rowsPerPage:'3'
  };
  error:any ;

  constructor(private adminService:AdminServiceService){}
  ngOnInit(): void {
    this.adminService.getTurfAdminsData().subscribe({
      next:(res:any)=>{
        const turfAdminType = res.turfAdminData.map((user:any)=>({
          userName :user.turfAdminName,
          email:user.email,
          phone:user.phone,
          id:user._id,
          isVerified:user.isVerified
        }))
        this.turfAdminData = turfAdminType
        this.initialised = true
        
      },
      error:(err)=>{
        this.error = err;
      }
    })
  }
  getVerifyId(turfAdminId:any){
    console.log(turfAdminId,' this is turfadmin in event ')
    this.adminService.verifyTurfAdmin(turfAdminId.id).subscribe(
      {
        next:(res:any)=>{
          console.log(res);
          const turfAdminType = res.turfAdminData.map((user:any)=>({
            userName :user.turfAdminName,
            email:user.email,
            phone:user.phone,
            id:user._id,
            isVerified:user.isVerified
          }))
          this.turfAdminData = turfAdminType
        },
        error:(err:any)=>{
          this.error = err
        }
      }
    )
  }

}
