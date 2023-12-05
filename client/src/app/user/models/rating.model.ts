import { UserData } from "./user.model";

export interface iRating{
    turfId:string|null,
    user:string,
    rating:number,
    message:string
}