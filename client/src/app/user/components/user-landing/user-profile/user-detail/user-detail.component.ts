import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileEditComponent } from '../../../../../shared/generics-components/profile-edit/profile-edit.component';
// import { Profile } from '../../../../../shared/models/shared-model';
import { UserService } from '../../../../../user/service/user.service';
import { ProfileResponse, UserProfile } from '../../../../models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  isInitialized:boolean= false;
  userProfile!:UserProfile;

  constructor(private userService:UserService, private matDiolog:MatDialog){}
    
  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next:(res:ProfileResponse)=>{
        this.userProfile = res.profileData;
        this.isInitialized = true;
      }
    })
  }
  getEditId(data:Event){
    console.log('clicked   ',data);
    const profileData = {...data}

    const diolog = this.matDiolog.open(ProfileEditComponent,{
      data:profileData,
      height:"70%",
      width:"60%"
    })
    diolog.componentInstance.cancelClicked.subscribe({
      next:()=>{
        diolog.close()
      }
    })
    diolog.componentInstance.saveProfile.subscribe({
      next:(data:any)=>{
       console.log(data);
       this.updateProfile(data)
       diolog.close()
      }
    })
  }
  updateProfile(data:UserProfile){
    console.log(data,' thisis to update in profile comp');
    
    this.userService.updateProfile(data).subscribe({
      next:(res)=>{
        console.log(res);
        this.userProfile = res.profileData
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
