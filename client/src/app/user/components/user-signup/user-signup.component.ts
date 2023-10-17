import { Component } from '@angular/core';
import { UserData } from '../../state/user.interface';
import { Store } from '@ngrx/store';
import { userSignupSubmit } from '../../state/user.action';
import { selectSignupError } from '../../state/user.selector';
import { FirebaseService } from 'src/app/shared/firebase-service/firebase.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent {
  formData!:UserData;
  serverError! :string;
  
  constructor(private store:Store,private firebaseService:FirebaseService,private userService:UserService, private router:Router){}
   userSingup :string = 'User';
   ngOnInit(): void {
    if(this.userService.isLoggedIn()){
      this.router.navigate(['/home'])
    }
    this.firebaseService.config()
    this.store.select(selectSignupError).subscribe(err=>{
      console.log('server error ',err);
      this.serverError=err
    })
   }
    onDataGet(data:UserData){
      this.formData = data;
      this.userService.verifyUserBeforeOtp(this.formData.phone).subscribe((res)=>{
        this.store.dispatch(userSignupSubmit({userData:this.formData}));
        this.firebaseService.sendUserOtp(this.formData.phone)  
      }
      ,err=>{
        console.log(err);
        this.serverError = err.error.message
      }
      )
    } 
}
