import { createReducer, on } from "@ngrx/store";
import { turfAdminState } from "./turf-admin.state";
import * as turfAdminAction from'./turf-admin.action';



export const turfadminReducer = createReducer(
    turfAdminState,
    on(turfAdminAction.turfAdminSendOTP,(state)=>({...state})),
    on(turfAdminAction.turfAdminSendOTPSuccess,(state)=>({...state,success:'OTP send success'})),
    on(turfAdminAction.turfAdminSendOTPFailed,(state)=>({...state,error:'OTP sending failed'})),
    on(turfAdminAction.turfAdminSignupSubmit,(state,{userData})=>({...state,turfadmin:userData})),
    on(turfAdminAction.turfAdminSignupSuccess,(state,{userData})=>({...state,turfadmin:userData})),
    on(turfAdminAction.turfAdminSignupFailed,(state,{error})=>({...state,error:error})),
    on(turfAdminAction.turfAdminLoginSuccess,(state,{token})=>({...state,isLoggedIn:true,success:token})),
    on(turfAdminAction.turfAdminLoginFailed,(state,{error})=>({...state,error:error})),
)