import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iBooking } from '../../../../../user/models/booking.model';
import { UserService } from '../../../../../user/service/user.service';
import { AdminService } from 'src/app/admin/admin-service/admin-service.service';

@Component({
  selector: 'app-single-booking-details',
  templateUrl: './single-booking-details.component.html',
  styleUrls: ['./single-booking-details.component.css']
})
export class SingleBookingDetailsComponent {
  bookingDetails !:iBooking;
  bookingId:string='';
  isInitialised:boolean= false;
  error:string= ''

  constructor(private route:ActivatedRoute,private adminService:AdminService){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(param=>{
      this.bookingId = param.get('bookingId') as string
    })
    this.adminService.getSingleBooking(this.bookingId).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.bookingDetails =res.bookings  as iBooking
      },
      error:err=>{
        console.log(err,' error from single booking details ');
        this.error ='Something error occured please try again'
      }
    })
  }
}
