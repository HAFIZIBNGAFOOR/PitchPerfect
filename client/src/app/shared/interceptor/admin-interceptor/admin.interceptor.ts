import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminServiceService } from 'src/app/admin/admin-service/admin-service.service';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {

  constructor(private adminService:AdminServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(request.url.startsWith('http://localhost:3001/admin')){
      const token = this.adminService.getAdminToken();
      console.log(token,'inside intercepted admin',request.url);
      if(token){
        let clonedReq =  request.clone({
          setHeaders:{
            Authorization:`Bearer ${token}`
          }
        })
        return next.handle(clonedReq)
      }
    }
   
    
    return next.handle(request);
  }
}
