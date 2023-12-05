import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { adminLogin } from '../../admin-state/admin.action';
import { AdminData } from '../../admin-state/admin.interface';
import { selectAdminLoginError } from '../../admin-state/admin.selector';
import { AdminService } from '../../admin-service/admin-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  roleType="Admin"
  loginData!:AdminData;
  loginForm!:FormGroup;
  serverError!:string ; 

  constructor(private fb:FormBuilder,private store:Store,private adminService:AdminService,private router:Router){}
  
  ngOnInit(): void {
    if(this.adminService.isAdminLoggedIn()){
      this.router.navigate(['admin'])
    }
    this.store.select(selectAdminLoginError).subscribe((err)=>{
          this.serverError = err
        })
    this.loginForm = this.fb.group(
      {
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(8)]]
      }
    )
  }
  onSubmit(){
    if(this.loginForm.valid){
      this.loginData ={
        email:this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      }
      this.store.dispatch(adminLogin({adminData:this.loginData}));
    }
  }
}
