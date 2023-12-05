import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-landing',
  templateUrl: './user-landing.component.html',
  styleUrls: ['./user-landing.component.css']
})
export class UserLandingComponent {
  isLoggedIn!:boolean;

  constructor(private userService:UserService,private router:Router){}
  
  ngOnInit(): void {
    if(this.userService.isLoggedIn()){
      this.isLoggedIn = true
    }else this.isLoggedIn = false
  }
  logout(event:string){
    console.log(event);
    if(event =='user'){
      this.isLoggedIn = false
      this.userService.logout()
    }
  }
}
