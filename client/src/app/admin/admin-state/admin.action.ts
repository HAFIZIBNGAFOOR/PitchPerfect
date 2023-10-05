import {createAction,props} from '@ngrx/store';
import { AdminData } from './admin.interface';


export const adminLogin = createAction('[Admin Login] Login ',props<{adminData:AdminData}>());
export const adminLoginSuccess = createAction('[Admin Login] Login success ')
export const adminLoginFailed = createAction('[Admin Login] Login failed ',props<{err:string}>())