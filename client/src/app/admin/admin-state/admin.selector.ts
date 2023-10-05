import {createFeatureSelector,createSelector} from '@ngrx/store';
import { AdminState, adminState } from './admin.state';



export const selectAdminState = createFeatureSelector<AdminState>('admin')

export const selectAdminLoginError = createSelector(
    selectAdminState,
    (state:AdminState)=>state.error
)
