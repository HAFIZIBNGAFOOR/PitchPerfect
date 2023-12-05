import { Component } from '@angular/core';
import { TurfAdminService } from '../../../turf-admin-service/turf-admin.service';
import { UserProfile } from '../../../../user/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ProfileEditComponent } from 'src/app/shared/generics-components/profile-edit/profile-edit.component';

@Component({
  selector: 'app-turf-profile',
  templateUrl: './turf-profile.component.html',
  styleUrls: ['./turf-profile.component.css']
})
export class TurfProfileComponent {
   turfAdminData!:UserProfile;
   showSpinner:boolean=true;
  constructor(private turfAdminService:TurfAdminService, private matDiolog:MatDialog){}

  ngOnInit(): void {

    this.turfAdminService.getTurfAdminProfile().subscribe({
      next:(res)=>{
        this.showSpinner = false
        console.log(res,' tis is response ');
        this.turfAdminData = {
          name:res.profile.turfAdminName,
          email:res.profile.email,
          phone:res.profile.phone,
          location:null,
          age:res.profile.age,
          _id:res.profile._id,
          wallet:res.profile.wallet
        }
      }
    })
  }
  getEdit(data:any){
    console.log('got event ',data);
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
  updateProfile(data:any){
    this.turfAdminService.updateProfile(data).subscribe({})
    console.log(data,' this is data ');
    
  }
}
