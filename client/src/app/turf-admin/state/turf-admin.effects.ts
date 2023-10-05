import { Injectable } from "@angular/core";
import { TurfAdminService } from "../turf-admin-service/turf-admin.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { turfAdminLogin, turfAdminLoginFailed, turfAdminLoginSuccess } from "./turf-admin.action";
import { catchError, switchMap, map } from "rxjs";
import { Router } from "@angular/router";





@Injectable()
export class TurfAdminEffects{

    constructor(private turfAdminService:TurfAdminService, private action$:Actions,private router:Router){}
     
    turfAdminLogin$ = createEffect(()=>
        this.action$.pipe(
            ofType(turfAdminLogin),
            switchMap(action => {
                console.log('inside the effect');
                return this.turfAdminService.turfAdminLogin(action.data).pipe(
                    map((res:any)=>{
                        this.turfAdminService.setToken(res.token);
                        this.router.navigate(['/turf-owner'])
                        return turfAdminLoginSuccess({token:res.token})
                    }),
                    catchError((err)=>{
                        return [turfAdminLoginFailed({error:err.error.message})]
                    })
                )
            })
        )
    )
}