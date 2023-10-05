import { createAction, props } from "@ngrx/store";
import { TurfAdmin } from "./turf-admin.state";
import { login } from "src/app/user/user-login/user-login.component";



export const turfAdminSendOTP = createAction('[Turf Admin] Send OTP',props<{phone:string}>());
export const turfAdminSendOTPSuccess = createAction('[Turf admin ],Send otp success',)
export const turfAdminSendOTPFailed = createAction('[Turf admin ],Send otp Falied')
export const turfAdminSignupSubmit = createAction('[User Signup] Turf admin login submit',props<{userData:TurfAdmin|null}>())
export const turfAdminSignupSuccess = createAction('[Turf admin]Turf admin Success',props<{userData:TurfAdmin|null}>())
export const turfAdminSignupFailed = createAction('[Turf admin]Turf admin Error ', props<{error:string}>());
export const turfAdminLogin = createAction('[Turf admin] Turf admin login ',props<{data:login}>())
export const turfAdminLoginSuccess = createAction('[Turf admin] Turf admin login success',props<{token:string}>())
export const turfAdminLoginFailed = createAction('[Turf admin] Turf admin login falied ',props<{error:string}>())