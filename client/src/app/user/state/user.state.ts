import { UserData } from "../models/user.model"

export interface UserState{
    isLoggedIn:boolean,
    userData:UserData|null ,
    serverError:string,
    success:string,
    otpStatus:string,
    error:string
}
export const userState:UserState ={
    isLoggedIn:false,
    userData:null,
    serverError:'',
    success:'',
    otpStatus:'',
    error:''
}

