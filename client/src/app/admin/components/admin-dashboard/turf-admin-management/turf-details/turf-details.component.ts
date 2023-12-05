import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../../../admin/admin-service/admin-service.service';
import { TurfAdmin } from '../../../../../turf-admin/models/turf-admin.model';

@Component({
  selector: 'app-turf-details',
  templateUrl: './turf-details.component.html',
  styleUrls: ['./turf-details.component.css']
})
export class TurfDetailsComponent {
  turfDetails:TurfAdmin={
    turfAdminName:'',
    phone:'',
    email:'',
    isVerified:false,
    password:null,
    _id:''
  } ;
  turfId!:string ;
  error!:string;
  constructor(private adminService:AdminService , private route : ActivatedRoute ,private snackBar:MatSnackBar){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.turfId = params.get('turfId') as string;
    });
    this.adminService.getSingleTurf(this.turfId).subscribe({
      next:(res:any)=>{
        this.turfDetails = res.turfAdmin
        console.log(this.turfDetails,' this is res form get single turf');
      },
      error:(err:any)=>{
        console.log(err,' this is error frm single turf');        
      }
    })
  }
  getVerifyId(turfAdminId:any){
    console.log(turfAdminId,' this is turfadmin in event ')
    this.adminService.verifyTurfAdmin(turfAdminId.id).subscribe(
      {
        next:(res:any)=>{
          console.log(res);
          const turfAdminType = res.turfAdminData.map((user:any)=>({
            userName :user.turfAdminName,
            email:user.email,
            phone:user.phone,
            id:user._id,
            actions:"View"
          }))
          this.turfDetails = turfAdminType
          console.log(this.turfDetails,turfAdminType);
        },
        error:(err:any)=>{
          this.error = err
        }
      }
    )
  }
  verifyAdmin(id:string){
    console.log(id,' t');
    this.adminService.verifyTurfAdmin(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.snackBar.open('Turf Admin Verified Successfully','close',{
          duration:3000
        })
        this.turfDetails = res.turfAdminData
      },
      error:(err:any)=>{
        console.log(err);
        this.error = err
      }
    })
    
  }
}
