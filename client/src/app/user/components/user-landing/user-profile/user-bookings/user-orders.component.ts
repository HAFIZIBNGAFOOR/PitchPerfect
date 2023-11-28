import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/service/user.service';


@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent {
  bookingDetails :any
  cancelledDataSource = new MatTableDataSource<any>();
  pendingDataSource = new MatTableDataSource<any>();
  completedDataSource = new MatTableDataSource<any>();
  displayedColumns:string[] =['turf','bookedSlots','totalCost','bookingStatus','actions'];
  tonavigate:string[]=[]
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private userService:UserService, private router:Router){}
  ngOnInit(): void {
    this.userService.getBookingDetails().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.bookingDetails = res.bookings;
        this.completedDataSource = this.bookingDetails.filter((booking:any) =>booking.  bookingStatus ==='Completed');
        this.pendingDataSource = this.bookingDetails.filter((booking:any) =>booking.  bookingStatus ==='Confirmed');
        this.cancelledDataSource = this.bookingDetails.filter((booking:any) =>booking.  bookingStatus ==='Cancelled');
        console.log(this.cancelledDataSource,' cancellllll',this.completedDataSource,' compleeee',this.pendingDataSource,' confiremddddd');
        
      }
    })
  }
  ngAfterViewInit() {
    this.completedDataSource.paginator = this.paginator;
  }
  viewDetails(row:any){
     this.router.navigate([`booking-details/${row._id}`]);
  }
}
