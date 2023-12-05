import { Component, EventEmitter, Input, Output } from '@angular/core';
import {FormBuilder, FormControl,FormGroup,Validators} from "@angular/forms"
import { login } from '../../../user/components/user-login/user-login.component';
import { notOnlySpacesValidator } from '../../custom-validator/noSpaceValidator';
// import {RouterLink} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Output() loginData:EventEmitter<any> = new EventEmitter();
  @Input() role ='';
  @Input() error = '';
  @Input() isLoggedIn!:boolean

  loginForm! :FormGroup;

  constructor(private formBuilder:FormBuilder){}

   ngOnInit(): void {
      this.loginForm = this.formBuilder.group (
        {
          phone:['',[Validators.required,Validators.pattern(/^\d{10}$/),notOnlySpacesValidator]],
          password:['',[Validators.required,Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/),notOnlySpacesValidator]]
        }
      )
   }
   onSubmit(){
    if(this.loginForm.valid){
      const loginData:login ={
        phone:this.loginForm.get('phone')?.value,
        password:this.loginForm.get('password')?.value
      } 
      this.loginData.emit(loginData)
    }
  }
}
