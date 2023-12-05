import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserService } from '../../../user/service/user.service';
import * as alertify from 'alertifyjs'




@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private userService:UserService  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     const token = this.userService.getToken();
     
     if(!req.url.includes('admin') && !req.url.includes('turfAdmin'))
     if(token){
      const clonedreq = req.clone({
        setHeaders:{
          Authorization:`Bearer ${token}`
        }
      })
      return next.handle(clonedreq).pipe(
        tap({
            next:(event)=>{
              if(event instanceof HttpResponse){
                console.log(event.status,' got response');
                alertify.success('response is successfull '+event.status)
              }
            },
            error:(error:HttpErrorResponse)=>{
              if(error.status==500 || error.status==404){
                alertify.error(`Something went wrong!
                  Please try again  ${error.status}`)
              }
            }
          
        })
      );
     }
    return next.handle(req);
  }
}

