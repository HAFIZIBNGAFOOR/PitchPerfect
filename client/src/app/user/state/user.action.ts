import {createAction,props} from '@ngrx/store';
import { UserData } from '../models/user.model';
import { login } from '../components/user-login/user-login.component';

export const userSendOtp = createAction('[User Signup] Send OTP',props<{phone:string}>())
export const userOTPSendSuccess = createAction('[User Signup] Send OTP success',props<{res:any}>());
export const userOTPSendFailed = createAction('[User Signup] Send OTP failed',props<{error:string}>())
export const userSignupSubmit = createAction('[User Signup] User login submit',props<{userData:UserData|null}>())
export const userSignupSuccess = createAction('[User Signup] Success',props<{userData:UserData|null}>())
export const duplicateEmail = createAction('[User Signup] Duplicate Email',props<{message:string}>())
export const userSignupFailed = createAction('[User Signup] Error ', props<{error:string}>());
export const userLogin = createAction('[User Login] user login ',props<{data:login}>())
export const userLoginSuccess = createAction('[User Login] user login success',props<{token:string}>())
export const userLoginFailed = createAction('[User Login] user login falied ',props<{error:string}>())