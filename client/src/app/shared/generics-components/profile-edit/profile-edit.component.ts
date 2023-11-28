import { Component, EventEmitter, Inject, Output } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserProfile } from '../../../user/models/user.model';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent {
  @Output() cancelClicked = new EventEmitter()
  @Output() saveProfile = new EventEmitter()

  constructor(@Inject(MAT_DIALOG_DATA) public data:UserProfile){
  }
  ngOnInit(): void {
    console.log(this.data,' this is data');
    
  }
  onCancel(){
    this.cancelClicked.emit()
  }
  onSubmit(form:NgForm){
    if(form.valid){
      console.log('valid' ,form.value);
      this.saveProfile.emit(form.value)
    }
  }
}
