import {createFeatureSelector,createSelector} from '@ngrx/store';
import { UserState } from './user.state';
import { state } from '@angular/animations';


export const selectAuthState = createFeatureSelector<UserState>('user');

export const selectSignupSuccess = createSelector(
    selectAuthState,
    (state:UserState)=>state.success
);
// export const selectDuplicateEmail = createSelector(
//     selectAuthState,
//     (state)
// )
export const selectSignupError = createSelector(
    selectAuthState,
    (state:UserState)=> state.serverError
)

export const selectUserData = createSelector(
    selectAuthState,
    (state:UserState)=> state.userData
) 

export const selectLoginError = createSelector(
    selectAuthState,
    (state:UserState)=>state.error
)