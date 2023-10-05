import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TurfAdminService } from 'src/app/turf-admin/turf-admin-service/turf-admin.service';

@Injectable()
export class TurfAdminInterceptor implements HttpInterceptor {

  constructor(private turfAdminService:TurfAdminService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(request.url.startsWith("http://localhost:3001/turfAdmin")){
      const token = this.turfAdminService.getToken();
      console.log(token);
      if(token){
        let clonedReq = request.clone({
          setHeaders:{
            Authorization:`Bearer ${token}`
          }
        })
        return next.handle(clonedReq);
      }
      return next.handle(request);
    }
    return next.handle(request);
  }
}
