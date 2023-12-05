import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Actions,createEffect,ofType } from "@ngrx/effects"; 
import{UserService} from "../service/user.service"
import { catchError, map, merge, mergeMap, switchMap } from "rxjs";
import { UserData } from "../models/user.model";
import { FirebaseService } from "src/app/shared/firebase-service/firebase.service";

import { userLogin, userLoginFailed, userLoginSuccess } from "./user.action";

@Injectable()
export class UserEffects{


    constructor(private router:Router,private action$:Actions, private service:UserService,private firebaseService:FirebaseService){}

    // signup$= createEffect(()=>
    //     this.actioin$.pipe(
    //         ofType(userSignupSubmit),
    //         switchMap(action=>{
    //             return this.service.userSingup(action.userData).pipe(
    //                 map(()=>{
    //                 this.router.navigate(['/verify'])
    //                 return userSignupSuccess()
    //                 }),
    //                 catchError((err)=>{
    //                    if(err.status == 422){
    //                             console.log(' this is inside duplicate email error ',err.error.message,err.status);
    //                             return [duplicateEmail({message:'Entered email already exists'})]
    //                         }else{
    //                             console.log('error from server >>>',err);
    //                            return [ signupFailure({error:'An error occured during singup Try Again'})]
    //                         }
    //                 })
    //             )
    //         })
    //     )
    // )
    login$ = createEffect(()=>
    this.action$.pipe(
        ofType(userLogin),
        switchMap(action=>{
            return this.service.userLogin(action.data).pipe(
                map((res:any)=>{
                    this.service.setToken(res.token)
                    this.router.navigate([''])
                    window.location.reload();
                    return userLoginSuccess(res.token)
                }),
                catchError((err)=>{
                    return [userLoginFailed({error:err.error.message})]
                })
            )
        })
    )
    )

}

