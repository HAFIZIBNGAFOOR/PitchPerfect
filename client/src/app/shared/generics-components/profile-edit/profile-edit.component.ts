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
  onCancel(){
    this.cancelClicked.emit()
  }
  onlySpacesValidator(value: string): { [key: string]: boolean } | null {
    if (value.trim() === '') {
      return { 'onlySpaces': true };
    }
    return null;
  }
  onSubmit(form:NgForm){
    if(form.valid){
      this.saveProfile.emit(form.value)
    }
  }
}
