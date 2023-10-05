import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core"
import { AdminServiceService } from "../admin-service/admin-service.service";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
import { adminLogin, adminLoginFailed, adminLoginSuccess } from "./admin.action";
import { Router } from "@angular/router";


@Injectable() 
export class AdminEffects{
    
    constructor(private adminService:AdminServiceService , private action$:Actions,private router:Router){}
    adminlogin$ = createEffect(()=>
      this.action$.pipe(
        ofType(adminLogin),
        switchMap((action)=>{
            return this.adminService.adminLogin(action.adminData).pipe(
                map((res:any)=>{
                  console.log(res);
                  this.adminService.setAdminToken(res.token);
                  this.router.navigate(['admin/dashboard'])
                  return adminLoginSuccess();
                }),
                catchError((err)=>{
                  const errorMessage =err.error.message
                  return [adminLoginFailed({err:errorMessage})];
                })
            )
        })
      )

    )
}
