import { createReducer, on } from "@ngrx/store"
import { userState } from "../state/user.state"
import * as userAction from '../state/user.action'
export {userState} from "../state/user.state"

 export const userReducer =  createReducer(
    userState,
    on(userAction.userSignupSubmit,(state,{userData})=>({...state,userData:userData})),
    on(userAction.userSignupSuccess,(state,{userData})=>({...state,serverError:'',success:'signup success',userData:userData,otpStatus:'verified'})),
    on(userAction.userSendOtp,(state,{phone})=>({...state,otpStatus:phone})),
    on(userAction.userOTPSendFailed,(state,{error})=>({...state,otpStatus:error})),
    on(userAction.userOTPSendSuccess,(state,{res})=>({...state,otpStatus:res})),
    on(userAction.userLoginSuccess,(state,{token})=>({...state,isLoggedIn:true,success:token})),
    on(userAction.userLoginFailed,(state,{error})=>({...state,error:error})),
 )