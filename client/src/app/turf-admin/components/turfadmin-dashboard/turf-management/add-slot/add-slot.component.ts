import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ColumnType } from '../../../../../shared/models/shared-model';
import { TurfAdminService } from '../../../../turf-admin-service/turf-admin.service';

@Component({
  selector: 'app-add-slot',
  templateUrl: './add-slot.component.html',
  styleUrls: ['./add-slot.component.css']
})
export class AddSlotComponent {
  addSlotForm!:FormGroup;
  turfLists:any ;
  turfTable:string = 'turfTable';
  isEmpty!:boolean ;
  columnDatas:ColumnType={
    columns:[
      {title:'Turf ',dataProperty:'turfName',sortable:false,filterable:false},
      {title:'Game',dataProperty:'game',sortable:false,filterable:false},
      {title:'Location',dataProperty:'location',sortable:false,filterable:false},
      {title:'Action',dataProperty:'actions',sortable:false,filterable:false},
    ],
    rowActions:[
      {label:"View", dataProperty:"_id",actionIdtoReturn:''},
    ],
    rowsPerPage:'3'
  };
  constructor(private fb:FormBuilder, private turfAdminService :TurfAdminService, private  router:Router){}

  

  ngOnInit(): void {
    this.turfLists ={
      turfImages:'',
      turfName:'',
      turfPrice:''
    }
    this.turfAdminService.getTurfs().subscribe({
      next:(res:any)=>{
        const turfLists = res.turflists.map((turf:any)=>({
          turfName: turf.turfName,
          game:turf.sportsType,
          location:`${turf.turfLocation.Address.split(',')[4]},${turf.turfLocation.Address.split(',')[5]}`,
          contact:turf.turfContact,
          id:turf._id,
          actions:'Manage Slots'
        }))
        this.turfLists = turfLists
        this.isEmpty = false    
          
      },
      error:(err)=>{
        if(err.status == 400){
          this.isEmpty = true
        }    
      }
    })
  }
  getTurfId(turf:any){
    this.router.navigate([`/turf-owner/manage-slots/add-slots/`,turf.id])
  }
}
