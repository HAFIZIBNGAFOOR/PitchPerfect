import { TurfData } from "src/app/turf-admin/models/turf-admin.model";
import { Slots } from "./slots.model";
import { UserData } from "./user.model";

 export interface iBooking{
    user:UserData
    turf:TurfData,
    time:string,
    bookingId:string,
    paymentType:string,
    totalCost:string,
    bookedSlots:iSlots,
    bookingStatus:string,
    Time:string,
    _id:string|null
 }
export interface iSlots{
   dateString:string| null,
   date:Date,
   slots:{
      start:string,
      end:string
   }
}