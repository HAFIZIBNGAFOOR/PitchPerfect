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
        this.turfLists = res.turflists
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
