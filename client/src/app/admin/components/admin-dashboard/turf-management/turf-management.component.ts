import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AdminService } from 'src/app/admin/admin-service/admin-service.service';
import { ColumnType } from 'src/app/shared/models/shared-model';
import { iTurfData } from 'src/app/user/models/turf.model';

@Component({
  selector: 'app-turf-management',
  templateUrl: './turf-management.component.html',
  styleUrls: ['./turf-management.component.css']
})
export class TurfManagementComponent {
  turfData!:iTurfData;
  textColor:string= 'blue'
  columnData:ColumnType={
    columns:[
      {dataProperty:'turfName',title:'Turf Name',sortable:false,filterable:false},
      {dataProperty:'turfPrice',title:'Price per Hour', sortable:false , filterable:false},
      {dataProperty:'sportsType',title:'Game', sortable:false , filterable:false},
      {dataProperty:'status',title:'Status', sortable:false , filterable:false},
      {dataProperty:'actions',title:'Action', sortable:false , filterable:false},
    ],
    rowActions:[
      {label:'Block/Unblock',dataProperty:'Block', actionIdtoReturn:''}
    ],
    rowsPerPage:'4'
  }
  constructor(private adminService:AdminService){}

  ngOnInit(): void {
    this.adminService.getTurfLists().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.turfData = res.turfs.map((turf:iTurfData)=>({
          turfName:turf.turfName,
          turfPrice:turf.turfPrice,
          turfStatus:turf.status,
          sportsType:turf.sportsType,
          status:turf.status,
          actions:turf.status==='active'? 'Block':'UnBlock',
          _id:turf._id,
          color:turf.status==='active'? 'red':'green'
        }));
      }
    })
  }
  getAction(event:iTurfData){
    console.log(event,' this is event');
     this.adminService.blockOrunblockTurf(event._id).subscribe({
      next:(res:any)=>{
        this.turfData = res.turfs.map((turf:iTurfData)=>({
          turfName:turf.turfName,
          turfPrice:turf.turfPrice,
          turfStatus:turf.status,
          sportsType:turf.sportsType,
          status:turf.status,
          actions:turf.status==='active'? 'Block':'UnBlock',
          _id:turf._id,
          color:turf.status==='active'? 'red':'green'
        }))
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err,' this is error');
      }
     }
     )
  }
}
