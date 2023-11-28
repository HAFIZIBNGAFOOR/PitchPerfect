import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TurfData } from '../../../../../../../turf-admin/models/turf-admin.model';
import { Slot, Slots, timeSlotsActive } from '../../../../../../models/slots.model';
import { UserService } from '../../../../../../service/user.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-slots',
  templateUrl: './change-slots.component.html',
  styleUrls: ['./change-slots.component.css']
})
export class ChangeSlotsComponent {
  turfData:TurfData ={
    turfContact:'',
    turfName:'',
    turfImages:[],
    turfFacilities:'',
    turfLocation:'',
    turfPrice:'',
    sportsDimension:'',
    sportsType:'',
    _id:null
  }
  slots!:Slots[];
  initialized:boolean= false;
  bookingId:string=''
  selectedSlot:timeSlotsActive | null = null
  submitted:boolean= false
  availableSlots:timeSlotsActive[]=[] 
  endDate!:Date;  
  selectedDate: Date = new Date();
  startDate:Date= new Date()
  selectedStringDate: string | null =new Date().toISOString().split('T')[0]
  constructor(private userService:UserService, private route :ActivatedRoute ,private _snackBar:MatSnackBar,private router:Router){}
    ngOnInit(): void {
      this.route.paramMap.subscribe(param=>{
        this.bookingId = param.get('bookingId') as string;
        
      })
      this.userService.getSingleBooking(this.bookingId).subscribe({
        next:(res:any)=>{
          this.initialized = true
          this.turfData = res.bookings.turf;
          this.selectedStringDate = res.bookings.bookedSlots.dateString
          this.selectedDate = res.bookings.bookedSlots.date
          this.slots = res.bookings.turf.slots
          const slots =  this.slots.filter(slot=> this.selectedStringDate === slot.dateString)
          if(slots.length > 0){
            this.availableSlots = slots[0].timeSlots.map((slot)=>({
              start:slot.start,
              end:slot.end,
              active:false
            }))
          }else{
            this.availableSlots = []
          }
          this.selectedDate = res.bookings.bookedSlots.date
        }
      })
    }
 

  getSlots(slot:timeSlotsActive){
    if(slot.active){ 
      slot.active = false;
      this.selectedSlot = null
      console.log(this.selectedSlot,slot);
    }
    else{
       slot.active = true
       this.selectedSlot = slot
    }
  }
  onSubmit(){
    this.submitted = true
  }
  getDate(event:any){
      const datePipe = new DatePipe('en-US');
      this.selectedStringDate = datePipe.transform(new Date(event.value), 'yyyy-MM-dd')
      this.selectedDate = new Date(event.value);
  
      const slots =  this.slots.filter(slot=> this.selectedStringDate === slot.dateString)
     if(slots.length >0){
      this.availableSlots = slots[0].timeSlots.map((slot)=>({
        start:slot.start,
        end:slot.end,
        active:false
      }))
     }else this.availableSlots = []
  }
  changeSlot(){
    const newSlot:Slot = {
      dateString:this.selectedStringDate,
      date:this.selectedDate,
      timeSlots:this.selectedSlot 
    }
    
    this.userService.changeSlots(this.bookingId,newSlot).subscribe({
      next:(res:any)=>{
          setTimeout(()=>{
            this._snackBar.open('Changed the slot successfully',"Done",{
              duration:4000
            })
            setTimeout(() => {
              this.router.navigate(['/user-profile/bookings']);
            }, 3000)
          },3000);
          // this.router.navigate(['/user-profile/bookings'])

      },
      error:(err)=>{
        console.log(err, ' this is error from change slots');
        
      }
    })
  }
}
