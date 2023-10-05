import { UserData } from "./user.interface"

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

