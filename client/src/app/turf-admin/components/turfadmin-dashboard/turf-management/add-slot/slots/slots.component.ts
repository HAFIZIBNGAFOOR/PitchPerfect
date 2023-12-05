import { Component, ViewEncapsulation, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { SlotData, TimeSlots } from '../../../../../models/slot-management.model';
import { TurfData } from '../../../../../models/turf-admin.model';
import { TurfAdminService } from '../../../../../turf-admin-service/turf-admin.service';
import { timeSlots } from 'src/app/turf-admin/models/time-slots.model';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,

})
export class SlotsComponent {
  turfId!:string;
  error!:string;
  turfData :TurfData ={
    turfName:'',
    turfLocation:'',
    turfPrice:'',
    turfFacilities:null,
    turfImages:[],
    turfContact:null,
    sportsDimension:null,
    sportsType:null,
    _id:null
  }
  startDate!:Date
  encodedDate !: string
  daysSelected !: string[] 
  addSlotForm !:FormGroup;
  backendResponse!:TimeSlots[]
  timeSlots:TimeSlots[]=timeSlots
  selectedTimeSlots!:TimeSlots[]  

  constructor(private route:ActivatedRoute, private turfadminService:TurfAdminService,private fb:FormBuilder , private snackBar:MatSnackBar , private cdr:ChangeDetectorRef){
}
  ngOnInit(): void {
    this.startDate= new Date();
    this.startDate.setDate( this.startDate.getDate() + 1);
    this.encodedDate = this.startDate.toISOString();
    this.daysSelected = [this.encodedDate.split('T')[0]]
    
    this.route.paramMap.subscribe(params => {
      this.turfId = params.get('turfId') as string;
      if(this.daysSelected.length == 1){
        this.turfadminService.getTurfTimeSlots(this.turfId,this.daysSelected[0]).subscribe({
          next:(res:any)=>{
            if(res.status == 206){
              this.turfData = res.turfData
            }else {
              this.error =''
              this.selectedTimeSlots = res.timeSlots.map((times:any)=>({
              start : times.start,
              end : times.end
            })),
            this.turfData = res.turfData
            }
          },
          error:(err:any)=>{
            this.error = err.error.message
          }
        })
      }else if(this.daysSelected.length>1){
        this.selectedTimeSlots = []
      }
    });
  }
  compareTimeSlots(timeSlot1:TimeSlots,timeSlot2:TimeSlots){
    if(timeSlot1 && timeSlot2){
      return timeSlot1.start === timeSlot2.start && timeSlot1.end === timeSlot2.end;
    }
    return false
  }
  onSubmit(){
    console.log(this.daysSelected,this.selectedTimeSlots) ;
    if(!this.selectedTimeSlots || this.selectedTimeSlots.length<1){
      this.error = 'Please select slots'
    }else{
      this.error =''
      const formData:SlotData ={
        turfId:this.turfId,
        date:this.daysSelected,
        timeSlots:this.selectedTimeSlots
      }
      
      this.turfadminService.addSlots(formData).subscribe({
        next:(res)=>{
          this.error =''
          this.snackBar.open('Slot added Successfully','close',{
            duration:3000
          })
        },
        error:(err:any)=>{
          console.log(err);
          this.error = err.error.message
        }
      })
    }
  }
isSelected = (event: any) => {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    return this.daysSelected.find(x => x == date) ? "selected" : '';
};

select(event: any, calendar: any) {
      const date =
        event.getFullYear() +
        "-" +
        ("00" + (event.getMonth() + 1)).slice(-2) +
        "-" +
        ("00" + event.getDate()).slice(-2);
      const index = this.daysSelected.findIndex(x => x == date);
      if (index < 0) {
        this.daysSelected = [...this.daysSelected,date]
      }
      else{ 
        this.daysSelected = this.daysSelected.filter(x => x !== date);
      }
      calendar.updateTodaysDate();
      if(this.daysSelected.length == 1){
        this.turfadminService.getTurfTimeSlots(this.turfId,this.daysSelected[0]).subscribe({
          next:(res:any)=>{
            if(res.status == 206){
              this.turfData = res.turfData
            }else {
              this.error =''
              this.selectedTimeSlots = res.timeSlots.map((times:any)=>({
              start : times.start,
              end : times.end
            })),
            this.turfData = res.turfData
            }
          },
          error:(err)=>console.log(err)
          
        })
      }else{
        this.selectedTimeSlots =[]
      }
}
}
