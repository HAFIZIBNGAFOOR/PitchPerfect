import { Component } from '@angular/core';
import { AdminService } from '../../../../admin/admin-service/admin-service.service';
import { ColumnType } from '../../../../shared/models/shared-model';
import { iBooking } from '../../../../user/models/booking.model';
import { iBookingType } from 'src/app/admin/admin-model/turf-details';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings-management',
  templateUrl: './bookings-management.component.html',
  styleUrls: ['./bookings-management.component.css']
})
export class BookingsManagementComponent {

  tableData :any;
  columnData:ColumnType={
    columns:[
      {title:'Name',dataProperty:'userName',sortable:false,filterable:false},
      {title:'Turf ',dataProperty:'turfName',sortable:false,filterable:false},
      {title:'Status',dataProperty:'bookingStatus',sortable:false,filterable:false},
      {title:'Price',dataProperty:'price',sortable:false,filterable:false},
      {title:'Action',dataProperty:'actions',sortable:false,filterable:false},
    ],
    rowActions:[
      {label:"Action", dataProperty:"isBlocked",actionIdtoReturn:''},
    ],
    rowsPerPage:'3'
  };
  constructor(private adminService:AdminService ,private router:Router){}

  ngOnInit(): void {

    this.adminService.getBookingDetails().subscribe({
      next:(res:any)=>{
        const bookingsData:iBookingType  = res.bookingDetails.map((booking:iBooking)=>({
            userName : booking.user.userName,
            turfName:booking.turf.turfName,
            bookingStatus:booking.bookingStatus,
            price:booking.totalCost,
            _id:booking._id,
            actions:'View'
        }))
        this.tableData = bookingsData
      }
    })
  }
  getAction(event:iBookingType){
    console.log(event);
    this.router.navigate([`admin/booking-details/${event._id}`])
  }
}
