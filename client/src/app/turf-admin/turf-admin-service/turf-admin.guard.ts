
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TurfAdminService } from './turf-admin.service';

@Injectable({
  providedIn: 'root'
})
export class TurfAdminGuard implements CanActivate{

  constructor(private turfAdminService :TurfAdminService ,private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if(this.turfAdminService.isLoggedIn()){
        return true
      }else {
        this.router.navigate(['turf-owner/login'])
        return false
      }
  }
}