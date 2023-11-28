import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminService } from '../../../admin/admin-service/admin-service.service';
import { Constants } from '../../../config/constants';


@Injectable()
export class AdminInterceptor implements HttpInterceptor {

  constructor(private adminService:AdminService, private adminUrl:Constants) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(request.url.startsWith(this.adminUrl.AdminAPIEndPoint)){
      const token = this.adminService.getAdminToken();
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
