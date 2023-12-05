import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/service/user.service';


@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent {
  bookingDetails :any
  bookingSubscription!:Subscription
  cancelledDataSource = new MatTableDataSource<any>([]);
  pendingDataSource = new MatTableDataSource<any>([]);
  completedDataSource = new MatTableDataSource<any>([]);
  displayedColumns:string[] =['turf','bookedSlots','totalCost','bookingStatus','actions'];
  tonavigate:string[]=[]
  @ViewChild('paginator') completedPaginator!: MatPaginator;
  @ViewChild('confirmedpaginator') confirmedPaginator!: MatPaginator;
  @ViewChild('cancelledpaginator') cancelledPaginator!: MatPaginator;

  
  constructor( private userService:UserService, private router:Router){}
  ngOnInit(): void {
    this.bookingSubscription = this.userService.getBookingDetails().subscribe({
      next:(res:any)=>{
        this.bookingDetails = res.bookings;
        this.completedDataSource = new MatTableDataSource(this.bookingDetails.filter((booking:any) =>booking.  bookingStatus ==='Completed'))
        this.completedDataSource.paginator = this.completedPaginator;
        this.pendingDataSource = new MatTableDataSource(this.bookingDetails.filter((booking:any) =>booking.  bookingStatus ==='Confirmed')) ;
        this.pendingDataSource.paginator = this.confirmedPaginator
        this.cancelledDataSource = new MatTableDataSource( this.bookingDetails.filter((booking:any) =>booking.  bookingStatus ==='Cancelled'));
        this.cancelledDataSource.paginator = this.cancelledPaginator 
      }
    })
  }
  // ngAfterViewInit() {
  //   this.completedDataSource.paginator = this.paginator;
  // }
  viewDetails(row:any){
     this.router.navigate([`booking-details/${row._id}`]);
  }
  ngOnDestroy(): void {
    if(this.bookingSubscription) this.bookingSubscription.unsubscribe()
  }
}
