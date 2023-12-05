import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserProfile } from '../../../user/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  longText!:string;
  @Output() Edit = new EventEmitter()
  @Input() profileData:UserProfile ={
    name:'',
    age:0,
    phone:'',
    email:'',
    location:{
      address:'',
      long:'',
      lat:''
    },
    _id:'',
    wallet:0
  }
  onEditUser(Profile:UserProfile){
    this.Edit.emit(Profile)
  }

}
