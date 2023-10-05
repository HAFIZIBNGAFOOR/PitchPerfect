import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate{

  constructor(private userService : UserService,private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if(this.userService.isLoggedIn()){
        return true
      }else {
        this.router.navigate(['/login'])
        return false
      }
  }
}
