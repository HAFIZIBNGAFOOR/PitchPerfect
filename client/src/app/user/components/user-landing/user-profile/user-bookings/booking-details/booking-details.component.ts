import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogModel, ConfirmationDiologComponent } from '../../../../../../shared/generics-components/confirmation-diolog/confirmation-diolog.component';
import { iBooking } from '../../../../../models/booking.model';
import { UserService } from '../../../../../service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationMapComponent } from 'src/app/shared/generics-components/navigation-map/navigation-map.component';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { iRating } from 'src/app/user/models/rating.model';
import { MatStepper } from '@angular/material/stepper';
import { Subscription } from 'rxjs';

// import { ConfirmDialogModel, ConfirmDialogComponent } from '../../../../../../shared/generics-components/confirmation-diolog';


@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent {
  @ViewChild('stepper') stepper!: MatStepper;

  singleBooking!:Subscription
  bookingId:string='';
  isInitialised:boolean=false;
  bookingDetails!:iBooking 
  bookedSlot!        :{
    start:string,
    end:string
  }
  result:any;
  turfId!:string|null
  loading:boolean = false;
  ratingArr :number[]= [];
  starCount:number= 5
  rating:number = 0
  isLinear:boolean = true;
  isOptional:boolean = true;
  error:string=''
  message:string =''
  ratingSubscription!:Subscription;
  updateBookingSubscription!:Subscription;
  firstFormGroup = this._formBuilder.group({
    rating: [this.rating,[Validators.required,this.customRatingValidator()]],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: this.message,
  });

  constructor(private _formBuilder: FormBuilder,private userService :UserService, private route :ActivatedRoute ,private dialog: MatDialog , private _snackBar : MatSnackBar, private router:Router){
    this.loading =true
  }

  customRatingValidator() {
    return (control:AbstractControl): ValidationErrors | null => {
      const rating = control.value;
      if (rating < 1) {
        return { invalidRating: true, message: 'Rating should be 1 or higher.' };
      }
      return null;
    };
  }
  ngOnInit(): void {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }

    this.route.paramMap.subscribe(param=>{
      this.bookingId = param.get('bookingId') as string
    })
   this.singleBooking =  this.userService.getSingleBooking(this.bookingId).subscribe({
      next:res=>{
        this.bookingDetails = res.bookings as iBooking
        this.bookedSlot = {start:this.bookingDetails.bookedSlots.slots[0].start,end:this.bookingDetails.bookedSlots.slots[this.bookingDetails.bookedSlots.slots.length-1].end}
        this.isInitialised = true;
        this.turfId = this.bookingDetails.turf._id
        this.loading= false
        if(res.rating){
          const rating = res.rating;
          this.rating = rating.rating;
          this.message = rating.message
          this.firstFormGroup.get('rating')?.setValue(this.rating);
          this.secondFormGroup.get('secondCtrl')?.setValue(this.message);
        }
      },
      error:err=>{
        this.loading = false
        console.log(' this is error from get single booking',err.error.message);
      }
    })
    this.secondFormGroup.get('secondCtrl')?.clearValidators();

  }

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
        this.updateBookingSubscription = this.userService.updateBooking(this.bookingId).subscribe({
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
  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
  onClick(rating:number) {
    console.log(rating)
    this.rating = rating
    this.error= ''
    this.firstFormGroup.get('rating')?.setValue(this.rating);
  }
  changeMessage(){
    this.message  = this.secondFormGroup.get('secondCtrl')?.value as string
    return true
  }
  addRating(){
    this.message = this.secondFormGroup.get('secondCtrl')?.value as string
    console.log(this.message);
    this.ratingSubscription = this.userService.addRating(this.rating,this.turfId,this.message,).subscribe({
      next:res =>{
        this._snackBar.open(" Thank you for sharing your rating ",'Close',{
          duration:3000,
        })
        this.stepper.reset()
        const rating = res.updatedRating as iRating
        this.rating= rating.rating;
        this.message = rating.message
        this.firstFormGroup.get('rating')?.setValue(this.rating);
        this.secondFormGroup.get('secondCtrl')?.setValue(this.message);
        console.log(res);
      },
      error:err=>console.log(err, 'this is error')
      
    })
  }
  showError(){
    if(this.rating!=0){
      this.error=''
      return true
    }else {
      this.error= 'Please add rating'
      return false
    }
  }
  ngOnDestroy(): void {
    if(this.singleBooking) this.singleBooking.unsubscribe();
    if(this.ratingSubscription)this.ratingSubscription.unsubscribe();
    if(this.updateBookingSubscription)this.updateBookingSubscription.unsubscribe()
  }
}
