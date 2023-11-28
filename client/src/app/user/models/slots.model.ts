export interface Slots {
    dateString:string| null,
    date:Date,
    timeSlots:timeSlots[]
}
export interface timeSlots{
    start:string,
    end:string
}
export interface timeSlotsActive{
    start:string,
    end:string,
    active:boolean
}
export interface Slot{
    dateString:string| null,
    date:Date,
    timeSlots:timeSlots|null
}