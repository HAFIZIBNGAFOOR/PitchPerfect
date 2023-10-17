import { Component } from '@angular/core';
import { AdminServiceService } from '../../../admin-service/admin-service.service';
import { ColumnType, Users } from 'src/app/shared/interface/interface';
import {MatTableDataSource} from "@angular/material/table";
import { UsersType } from '../../../admin-state/admin.interface';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {
  userData = new MatTableDataSource<Users>();
  initialized:boolean = false;
  userToBU:any ;
  columnData:ColumnType={
    columns:[
      {title:'Name',dataProperty:'userName',sortable:false,filterable:false},
      {title:'Email',dataProperty:'email',sortable:false,filterable:false},
      {title:'Phone',dataProperty:'phone',sortable:false,filterable:false},
      {title:'Status',dataProperty:'isBlocked',sortable:false,filterable:false},
    ],
    rowActions:[
      {label:"Action", dataProperty:"isBlocked",actionIdtoReturn:''},
    ],
    rowsPerPage:'3'
  };
  err:any

  constructor(private adminService:AdminServiceService){}

  ngOnInit(): void {
    this.adminService.getUsersList().subscribe(
      {
        next:(res:any)=>{
          const usertype = res.users.map((user:any)=>({
            userName:user.userName,
            email:user.email,
            phone:user.phone,
            _id:user._id,
            isBlocked:user.isBlocked?'Blocked':'Active'
          }))
          this.userData = usertype
        },
        error:(err:any)=> this.err = err
      }
    )
    this.initialized = true
  }
  getAction(user:UsersType){
    this.adminService.blockOrUnblockUser(user._id).subscribe(
      { 
        next:(res:any)=>{
          console.log(res);
          const usertype:any = res.users.map((user:any)=>({
            userName:user.userName,
            email:user.email,
            phone:user.phone,
            _id:user._id,
            isBlocked:user.isBlocked ?'Blocked':'Active'
          }))
          this.userData = usertype
        },
        error:(err)=>this.err= err
      }
    )
  }
  // blockUnblockUser(userId:string){
  //   return userId
  // }
}
