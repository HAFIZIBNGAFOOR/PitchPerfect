import { Component, EventEmitter, Input, Output } from '@angular/core';
import {FormBuilder, FormControl,FormGroup,Validators} from "@angular/forms"
import { login } from '../../../user/components/user-login/user-login.component';
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

  loginForm! :FormGroup;

  constructor(private formBuilder:FormBuilder){}

   ngOnInit(): void {
      this.loginForm = this.formBuilder.group (
        {
          phone:['',[Validators.required,Validators.pattern(/^\d{10}$/)]],
          password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(16)]]
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
