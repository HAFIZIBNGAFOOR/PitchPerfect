import { createReducer, on } from "@ngrx/store";
import { adminState } from "./admin.state";
import * as adminActions from './admin.action';


export const adminReducer = createReducer(
    adminState,
    on(adminActions.adminLoginSuccess,(state)=>({...state,isLoggedIn:true})),
    on(adminActions.adminLoginFailed,(state,{err})=>({...state,error:err}))
)