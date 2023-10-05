import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user/service/user.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private userService:UserService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     const token = this.userService.getToken();
     console.log(token,'inside intercepted user',req.url);
     if(!req.url.includes('admin') && !req.url.includes('turfAdmin'))
     if(token){
      const clonedreq = req.clone({
        setHeaders:{
          Authorization:`Bearer ${token}`
        }
      })
      return next.handle(clonedreq);
     }
    return next.handle(req);
  }
}
