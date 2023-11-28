import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogModel, ConfirmationDiologComponent } from '../../../../../../shared/generics-components/confirmation-diolog/confirmation-diolog.component';
import { iBooking } from '../../../../../models/booking.model';
import { UserService } from '../../../../../service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookTurfComponent } from '../../../book-turf/book-turf.component';
import { NavigationMapComponent } from 'src/app/shared/generics-components/navigation-map/navigation-map.component';

// import { ConfirmDialogModel, ConfirmDialogComponent } from '../../../../../../shared/generics-components/confirmation-diolog';


@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent {
  bookingId:string='';
  isInitialised:boolean=false;
  bookingDetails!:iBooking 
  result:any;
  turfId!:string|null
  loading:boolean = false;

  constructor(private userService :UserService, private route :ActivatedRoute ,private dialog: MatDialog , private _snackBar : MatSnackBar, private router:Router){
    this.loading =true
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(param=>{
      this.bookingId = param.get('bookingId') as string
    })
    this.userService.getSingleBooking(this.bookingId).subscribe({
      next:(res:any)=>{
        this.bookingDetails = res.bookings as iBooking
        this.isInitialised = true;
        this.turfId = this.bookingDetails.turf._id
        console.log(res,' this is responoce',this.bookingDetails);
        this.loading= false
      },
      error:err=>{
        this.loading = false
        console.log(' this is error from get single booking',err.error.message);
      }
    })
  }
  // cancelBooking(bookingId:string){
  //   console.log(bookingId);
  //   this.userService
    
  // }
  confirmDiolog(){
    const message='Are you sure you want to Cancel Booking';
    const diologData = new ConfirmDialogModel('Confirm Cancel',message,'confirm')
    const dialogRef = this.dialog.open(ConfirmationDiologComponent,{
      width:'35%',
      height:'30%',
      data:diologData
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.result = result
      console.log(result);
      
      if(result){
        this.userService.updateBooking(this.bookingId).subscribe({
          next:(res:any)=>{
            console.log(res)
            
            this._snackBar.open(res.message,'close',{
              duration:4000,
            })
            this.bookingDetails = res.updatedBooking as iBooking
          },
          error:err=>{
            this._snackBar.open('Something error Occured try Again','close',{
              duration:4000,
            })
          }
          
        })
      }
    })
  }
  changeSlot(){
    const message ="Are You sure you want to change slot";
    const diologData = new ConfirmDialogModel('Change Slot',message,'cancel');
    const diologRef = this.dialog.open(ConfirmationDiologComponent,{
      width:'30%',
      height:'35%',
      data:diologData
    });
    diologRef.afterClosed().subscribe((res)=>{
      if(res){
        this.router.navigate([`change-slots/${this.bookingId}`])
      }
    })
  }
  showDirection(){
    this.dialog.open(NavigationMapComponent,{
      width:'70%',
      height:'60%',
      data:{turfId:this.turfId}
    })
  }

}
