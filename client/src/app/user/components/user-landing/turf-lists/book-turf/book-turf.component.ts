import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { iRating } from 'src/app/user/models/rating.model';
import { TurfData } from 'src/app/turf-admin/models/turf-admin.model';
import { Slots, timeSlotsActive } from 'src/app/user/models/slots.model';
import { UserService } from 'src/app/user/service/user.service';
import { convertTo24HourFormat } from 'src/app/user/service/helper-function/covertTo24hour';
import * as alertify from 'alertifyjs'
import { loadStripe } from '@stripe/stripe-js';




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
  times:string[]=[]
  endTimes:string[]=[]
  initialized:boolean = false;
  submitted:boolean = false;
  active:boolean = false;
  selectedSlot:timeSlotsActive | null = null
  startTime!:string;
  endTime!:string;
  error!:string;
  ratings !:iRating[]
  avgRating!:number;
  maxRating:number = 5
  totalCost!:number

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
        if(res.ratings && res.avgRating){
          this.ratings = res.ratings as iRating[]
          this.avgRating = res.avgRating as number
        }
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
          this.times = this.availableSlots.map(time=>(time.start))
        }else{
          if(formattedDate !== datePipe.transform(new Date(),'yyyy-MM-dd')){
            for(let i= 5;i<12;i++ ){
              this.times.push(`${i}:00 PM`)
            } 
           this.availableSlots = []
          }
        }
      },
      error:(err:any)=>{
        console.log(err,' inside the error ')
      }
    })
  }
  getDate(event: MatDatepickerInputEvent<any,any>) {
      this.startTime = '';
      this.endTime='';
      this.times = [];
      this.endTimes = []
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
      this.times = this.availableSlots.map(time=>(time.start))
     }else {
      if(formattedDate!== datePipe.transform(new Date(),'yyyy-MM-dd')){
        for(let i= 5;i<12;i++ ){
          this.times.push(`${i}:00 PM`)
        } 
       this.availableSlots = []
      }
     }
    }
    onSubmit(){
      this.submitted = true
    }

    onStartTimeChange(event:any){
      console.log('on change',event,this.startTime);
      this.startTime = event
      let convertedStartTime = convertTo24HourFormat(this.startTime);
      if(this.availableSlots && this.availableSlots.length>0){
        const  endTimesArray = this.availableSlots.filter(time=>convertTo24HourFormat(time.end)>convertedStartTime || time.end =='12:00 AM').map(time=>time.end);

      endTimesArray.sort((a,b)=>convertTo24HourFormat(a)-convertTo24HourFormat(b));
      this.endTimes =[]
      let starting = 0
      if(endTimesArray[0]=='12:00 AM')starting= 1
      for(let i = starting;i<endTimesArray.length;i++){
        if(starting){
          if(convertedStartTime+i == convertTo24HourFormat(endTimesArray[i])){
            this.endTimes.push(endTimesArray[i]);
          }
        }else{
          if(convertedStartTime+i+1 == convertTo24HourFormat(endTimesArray[i])){
            this.endTimes.push(endTimesArray[i]);
          }
        }
      }
      if(endTimesArray[0]=='12:00 AM'){
        this.endTimes.push(endTimesArray[0])
      } 
      }else{
        for(let i = Number(this.startTime.split(':')[0])+1;i <= 12 ;i++){
          if(i==12) this.endTimes.push(`${i}:00 AM`)
          else this.endTimes.push(`${i}:00 PM`)
        }
      }
    }


    onCalculateCost(event:string){
      this.endTime = event;
      let totalSlots=0
      if(this.endTime=='12:00 AM')  totalSlots = 24- convertTo24HourFormat(this.startTime)
      else totalSlots = convertTo24HourFormat(this.endTime)-convertTo24HourFormat(this.startTime)
       this.totalCost = Number(this.turfData.turfPrice) * totalSlots
    }

    getSlots(slot:timeSlotsActive){
      if(slot.active){ 
        slot.active = false;
        this.selectedSlot = null
      }
      else{
         slot.active = true
         this.selectedSlot = slot
      }
    }
    // cancelSlot(){
    //   this.selectedSlot = null
    //   this.submitted = false
    // }
    // submitSlots(){
    //   console.log('clickeddddsubmit');
    //   if(this.selectedSlot){
    //     this.submitted = false
    //   }
    // }
    proceedCheckout(){
      const turfId = this.turfId;

      const selectedSlots = {
        date:this.selectedStringDate,
        slots:{
          start:this.startTime,
          end:this.endTime
        }
      }
      this.service.postPayment(turfId,selectedSlots).subscribe({
        next:async(res:any)=>{
          this.error=''
          let stripe = await loadStripe('pk_test_51OADBiSICdW4biAom3vpv4BKSIsJWd0HLr4hFYPmzQcf6thPy7Sbp4AmkMxPO75G8m4TtERfzeZCMd4uFbfpqiGc00TaTKBXJC');
          stripe?.redirectToCheckout({
            sessionId:res.id
          })
        }
      })
      this.getFullSlots()
    }
    checkWalletAndProceed(){
      this.selectedSlot={
        start:this.startTime,
        end:this.endTime,
        active:false
      }
      console.log(this.selectedSlot,' this is slots sleceetsdd',this.selectedDate,this.selectedStringDate,this.totalCost,this.turfId);
      
      this.service.getWalletDetails(this.turfId,{date:this.selectedDate,dateString :this.selectedStringDate,slots:this.selectedSlot},this.totalCost).subscribe({
        next:res=>{
          this.error= ''
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
            alertify.error('Not enough wallet amount ').set('position','bottom-center')
            this.error = "Not enough Wallet Amount"
          }else this.error = "Something went wrong try again"
        }
      })
    }
    getStarCount(rating: number): number[] {
      return Array.from({ length: 5 }, (_, i) => i + 1 <= rating ? i + 1 : 0);
    }
}
