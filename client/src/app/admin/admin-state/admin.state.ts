export interface AdminState{
    email:string,
    isLoggedIn:boolean,
    error:string
}

export const adminState:AdminState = {
    email:'',
    isLoggedIn:false,
    error:''
}