import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserData } from 'src/app/user/models/user.model';
import { FirebaseService } from 'src/app/shared/firebase-service/firebase.service';
import { notOnlySpacesValidator } from '../../custom-validator/noSpaceValidator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  @Output() formData :EventEmitter<any> = new EventEmitter();
  @Input() errorMessage!:string;
  @Input() typeofUser!:string;
  signupForm! : FormGroup;


  constructor(private formBuilder:FormBuilder,private firebaseService:FirebaseService){}
  ngOnInit(): void {

    this.signupForm = this.formBuilder.group(
      {
        userName:['',[Validators.required,Validators.minLength(4),notOnlySpacesValidator]],
        email:['',[Validators.required,Validators.email,notOnlySpacesValidator]],
        phone:['',[Validators.required,Validators.pattern(/^\d{10}$/),notOnlySpacesValidator]],
        password:['',[Validators.required, Validators.minLength(8),notOnlySpacesValidator]]
      }
    )
  }
  onSubmit(){
    if(this.signupForm.valid) {
      const formData:UserData ={
        userName:this.signupForm.get('userName')?.value,
        email:this.signupForm.get('email')?.value,
        phone:this.signupForm.get("phone")?.value,
        password:this.signupForm.get("password")?.value,
        age:null
      }
      this.formData.emit(formData)
    }
  }
}
