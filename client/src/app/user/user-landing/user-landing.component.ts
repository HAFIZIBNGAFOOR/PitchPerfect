import { Component } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-landing',
  templateUrl: './user-landing.component.html',
  styleUrls: ['./user-landing.component.css']
})
export class UserLandingComponent {

  constructor(private userService:UserService){}
  
  ngOnInit(): void {
    this.userService.getUserHome().subscribe(
      res => console.log(res,' response from user home'),
      err => console.log(err,' eroro from get user home')

      
    )
  }
  logout(){
    this.userService.logout()
  }
}
