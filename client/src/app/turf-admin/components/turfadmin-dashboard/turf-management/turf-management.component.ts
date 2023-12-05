import { Component } from '@angular/core';
import { ColumnType } from '../../../../shared/models/shared-model';
import { TurfAdminService } from '../../../turf-admin-service/turf-admin.service';

@Component({
  selector: 'app-turf-management',
  templateUrl: './turf-management.component.html',
  styleUrls: ['./turf-management.component.css']
})

export class TurfManagementComponent {
  turfLists:any ;
  turfTable:string = 'turfTable';
  isEmpty:boolean = true;
  columnDatas:ColumnType={
    columns:[
      {title:'Turf ',dataProperty:'turfName',sortable:false,filterable:false},
      {title:'Game',dataProperty:'sportsType',sortable:false,filterable:false},
      {title:'Turf Price',dataProperty:'turfPrice',sortable:false,filterable:false},
      {title:'Turf Status',dataProperty:'turfStatus',sortable:false,filterable:false},
      {title:'Block',dataProperty:'action2',sortable:false,filterable:false},
      {title:'Action',dataProperty:'actions',sortable:false,filterable:false},

    ],
    rowActions:[
      {label:"View", dataProperty:"_id",actionIdtoReturn:''},
    ],
    rowsPerPage:'3'
  };
  constructor(private turfAdminService:TurfAdminService){}

  ngOnInit(): void {
    this.turfLists ={
      turfImages:'',
      turfName:'',
      turfPrice:''
    }
    this.turfAdminService.getTurfs().subscribe({
      next:(res:any)=>{
        this.turfLists = res.turflists.map((turf:any)=>({
          turfName:turf.turfName,
          sportsType:turf.sportsType,
          turfPrice:turf.turfPrice,
          turfStatus:turf.status,
          actions:'Edit',
          action2:turf.status=='active'?'Block':'Unblock',
          color:'primary',
          secondColor:turf.status=='active'?'red':'green',
          turfID:turf._id
        }))
        this.isEmpty = false      
      },
      error:(err)=>{
        if(err.status == 400){
          this.isEmpty = true
        }
        console.log(err);        
      }
    })
  }
  getBlockAction(turf:any){
    console.log(turf,' this is turf');
    this.turfAdminService.blockUnblockTurf(turf).subscribe({
      next:(res:any)=>{
        this.turfLists = res.turfs.map((turf:any)=>({
          turfName:turf.turfName,
          sportsType:turf.sportsType,
          turfPrice:turf.turfPrice,
          turfStatus:turf.status,
          actions:'Edit',
          action2:turf.status=='active'?'Block':'Unblock',
          color:'primary',
          secondColor:turf.status=='active'?'red':'green',
          turfID:turf._id
        }))
        this.isEmpty = false      
      },
      error:(err)=>{
        if(err.status == 400){
          this.isEmpty = true
        }
        console.log(err);        
      }
    })
    
  }
}
