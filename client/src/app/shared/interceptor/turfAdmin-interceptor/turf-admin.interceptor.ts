import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TurfAdminService } from '../../../turf-admin/turf-admin-service/turf-admin.service';
import {Constants} from '../../../config/constants'

@Injectable()
export class TurfAdminInterceptor implements HttpInterceptor {

  constructor(private turfAdminService:TurfAdminService ,private turfAdminUrl:Constants) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(request.url.startsWith(this.turfAdminUrl.TurfOwnerAPIEndPoint)){
      const token = this.turfAdminService.getToken();
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
