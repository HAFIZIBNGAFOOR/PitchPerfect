import { Component } from '@angular/core';
import { TurfAdminService } from 'src/app/turf-admin/turf-admin-service/turf-admin.service';
interface columnData {
  columns:any[]
}
@Component({
  selector: 'app-turf-management',
  templateUrl: './turf-management.component.html',
  styleUrls: ['./turf-management.component.css']
})

export class TurfManagementComponent {
  turfLists:any ;
//   columnData:columnData[]=[
//     columns:[
//       {title:'Turf Name',dataProperty:'turfName'},
//       {title:'Turf Price',dataProperty:'turfPrice'},
//       {title:'Turf Name',dataProperty:'turfImages'},
//     ],
// ];;
  constructor(private turfAdminService:TurfAdminService){}

  ngOnInit(): void {
    this.turfLists ={
      turfImages:'',
      turfName:'',
      turfPrice:''
    }
    this.turfAdminService.getTurfs().subscribe({
      next:(res:any)=>{
        console.log(res,'this is turf lists');
        this.turfLists = res.turflists
        console.log(this.turfLists);
        
      },
      error:(err)=>{
        console.log(err);        
      }
    })
  }
}
