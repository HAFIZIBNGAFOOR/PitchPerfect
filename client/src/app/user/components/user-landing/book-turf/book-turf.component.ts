import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { TurfData } from '../../../../turf-admin/models/turf-admin.model';
import { Slots, timeSlots, timeSlotsActive } from '../../../../user/models/slots.model';
import { UserService } from '../../../../user/service/user.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { MatSnackBar } from '@angular/material/snack-bar';

// ...





@Component({
  selector: 'app-book-turf',
  templateUrl: './book-turf.component.html',
  styleUrls: ['./book-turf.component.css']
})
export class BookTurfComponent {

  turfId!:string;
  turfData!:TurfData;
  slots!:Slots[];
  startDate!:Date ;
  endDate!:Date;  
  selectedDate: Date = new Date();
  selectedStringDate:string |null = new Date().toISOString().split('T')[0]
  availableSlots!:timeSlotsActive[] ;
  initialized:boolean = false;
  submitted:boolean = false;
  active:boolean = false;
  selectedSlot:timeSlotsActive | null = null
  error!:string;

  constructor(private service : UserService, private route:ActivatedRoute, private http:HttpClient , private router:Router, private _snackBer:MatSnackBar){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(param =>{
      this.turfId = param.get('turfId') as string;
    })
    this.getFullSlots()
  }
  getFullSlots(){
    this.service.getTurfSlots(this.turfId).subscribe({
      next:(res:any)=>{
        this.initialized = true
        this.slots = res.slots
        this.turfData = res.turfData
        this.startDate = new Date()
        const datePipe = new DatePipe('en-US');
        const formattedDate = datePipe.transform(new Date(), 'yyyy-MM-dd')
        const slots =  this.slots.filter(slot=> formattedDate === slot.dateString)
        
        if(slots.length > 0){
          this.availableSlots = slots[0].timeSlots.map((slot)=>({
            start:slot.start,
            end:slot.end,
            active:false
          }))
        }else{
          this.availableSlots = []
        }
      },
      error:(err)=>{
        console.log(err,' inside the error ')
      }
    })
  }
  getDate(event: MatDatepickerInputEvent<any,any>) {
      const datePipe = new DatePipe('en-US');
      const formattedDate = datePipe.transform(new Date(event.value), 'yyyy-MM-dd')
      const slots =  this.slots.filter(slot=> formattedDate === slot.dateString)
      console.log(slots,formattedDate,event.value);
      this.selectedStringDate = formattedDate 
     if(slots.length >0){
      this.availableSlots = slots[0].timeSlots.map((slot)=>({
        start:slot.start,
        end:slot.end,
        active:false
      }))
     }else   this.availableSlots = []
    }
    onSubmit(){
      this.submitted = true
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
    cancelSlot(){
      this.selectedSlot = null
      this.submitted = false
    }
    submitSlots(){
      console.log('clickeddddsubmit');
      if(this.selectedSlot){
        this.submitted = false
      }
    }
    proceedCheckout(){
      const turfId = this.turfId;
      const selectedSlots = {
        date:this.selectedStringDate,
        slots:this.selectedSlot
      }
      console.log(turfId, selectedSlots,' inside procedd checlkout');
      
      this.service.postPayment(turfId,selectedSlots).subscribe({
        next:async(res:any)=>{
          this.error=''
          console.log(res);
          let stripe = await loadStripe('pk_test_51OADBiSICdW4biAom3vpv4BKSIsJWd0HLr4hFYPmzQcf6thPy7Sbp4AmkMxPO75G8m4TtERfzeZCMd4uFbfpqiGc00TaTKBXJC');
          stripe?.redirectToCheckout({
            sessionId:res.id
          })
        }
      })
      this.getFullSlots()
    }
    checkWalletAndProceed(){
      this.service.getWalletDetails(this.turfId,{date:this.selectedDate,dateString :this.selectedStringDate,slots:this.selectedSlot}).subscribe({
        next:(res:any)=>{
          this.error= ''
          console.log(res);
          setTimeout(()=>{
            this._snackBer.open('Turf booked successfully ',"Close",{
              duration:3000
            })
          },3000)
          this.router.navigate(['/booking-success'])
        },
        error:(err:any)=>{
          console.log(err,' this is error in paymnet using wallet');
          
          if(err.status==402){
            this.error = "Not enough Wallet Amount"
          }else this.error = "Something went wrong try again"
        }
      })
    }
}
