import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { userLogin } from '../../state/user.action';
import { selectLoginError } from '../../state/user.selector';
// import { UserService } from '.';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

export interface login{
  phone:string,
  password:string
}

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})

export class UserLoginComponent {
   
  user:string = 'USER';
  loginData!:login
  serverError!:string;

   constructor(private store:Store,private userService:UserService,private router:Router){}
    ngOnInit(): void {
      if(this.userService.isLoggedIn()){
        this.router.navigate(['/home'])
      }
      this.store.select(selectLoginError).subscribe((res)=>{
        this.serverError=res
      })
    }

   getLoginData(data:login){
    this.loginData = data;
    this.store.dispatch(userLogin({data:this.loginData}))
    console.log(this.loginData);
   }


}
