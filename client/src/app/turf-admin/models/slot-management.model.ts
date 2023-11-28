export interface TimeSlots{
    start:string,
    end:string,
}
export interface SlotData{
    turfId:string,
    date:Date|string [],
    timeSlots:TimeSlots[]
}