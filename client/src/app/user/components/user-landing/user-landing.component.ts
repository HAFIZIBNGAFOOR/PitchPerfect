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
    console.log('this is isisnaaesed');
    
    if(this.userService.isLoggedIn()){
      this.isLoggedIn = true
    }
    // this.userService.getSampleApi().subscribe({
    //   next:(res:any)=>{
    //     // res.json()
    //     console.log(res ,' this is new');
    //   }
    // })
    // this.userService.getSportsTypes().subscribe({
    //   next:res=>console.log(res,' this is userservice ')
      
    // })
  }
  logout(event:string){
    console.log(event);
    if(event =='user')
    this.userService.logout()
  }
}
