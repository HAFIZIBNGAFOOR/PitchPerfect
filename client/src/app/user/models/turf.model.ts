export interface iTurfData {
    turfLocation: {
      Address: string;
      lat: string;
      long: string;
    };
    _id: string;
    turfImages: string[];
    slots: iSlot[] ;
    bookedSlots: iSlot[] ;
    turfName: string;
    sportsDimension: string;
    sportsType: string;
    turfPrice: number;
    status:string;
  }
  export interface iSlot {
    dateString: string;
    date: Date;
    timeSlots: iTimeSlot[]; 
  }
  export interface iTimeSlot{
    start:string,
    end:string
  }