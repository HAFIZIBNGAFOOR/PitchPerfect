import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TurfAdminState } from "../models/turf-admin.model";


 export const selectTurfAdmin= createFeatureSelector<TurfAdminState>('turfAdmin');

 export const selectTurfAdminData = createSelector(
    selectTurfAdmin,
    (state:TurfAdminState)=>state.turfadmin
 )
 export const selectOTPError = createSelector(
   selectTurfAdmin,
   (state:TurfAdminState)=>state.error
 )
 export const selectTurfAdminLoginError = createSelector(
  selectTurfAdmin,
  (state:TurfAdminState)=>state.error
 )