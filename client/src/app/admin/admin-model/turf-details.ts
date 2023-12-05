export  interface TurfType  {
    turfName:string;
    turfImages:string;
    turfPrice:string;
    turfFacilities:string;
    turfLocation:{
        long:string,
        lat:string,
        address:string
    }
}
export interface iBookingType{
    userName:string,
    turfName:string,
    bookingStatus:string,
    price:string,
    actions:string,
    _id:string
}