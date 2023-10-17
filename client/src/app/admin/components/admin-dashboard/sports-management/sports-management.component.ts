import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminServiceService } from 'src/app/admin/admin-service/admin-service.service';
import { Sports } from 'src/app/admin/admin-state/admin.interface';
import { noSpacesValidator } from 'src/app/shared/custom-validator/noSpaceValidator';

@Component({
  selector: 'app-sports-management',
  templateUrl: './sports-management.component.html',
  styleUrls: ['./sports-management.component.css']
})
export class SportsManagementComponent {
  @ViewChild('sportsDialogOpen')sportsDialogOpen!:TemplateRef<any>;
  @ViewChild('userForm') userForm: any;

  dialogRef:any;
  sportsData!:Sports;
  sportsForm!:FormGroup;
  error!:string;
  
  constructor(private dialog:MatDialog, private fb:FormBuilder,private adminService:AdminServiceService,private snackbar:MatSnackBar ){}

  ngOnInit(): void {
    this.sportsData = {sportsName:null,sportsDimension:null};
    this.sportsForm = this.fb.group({
      sportsName:['',[Validators.required,Validators.pattern('^.{4,}$'), noSpacesValidator()]],
      sportsDimension:['',[Validators.required]]
    })
  }
  sportsDialog(){
    this.dialogRef = this.dialog.open(this.sportsDialogOpen,{
      height:'50%',
      width:'50%',
    })
    this.dialogRef.afterClosed().subscribe({
      next:(res:any)=>{
        this.sportsData.sportsName =res[0] ;
        this.sportsData.sportsDimension = res[1]
        this.adminService.addSports(this.sportsData).subscribe({
          next:(res:any)=>{
            console.log(res,);    
              this.snackbar.open('Sports Added successfully','close',{
                duration:3000
              })
          },
          error:(err)=>console.log(err)          
        })
      }
    })
  }
  onSubmit(){
    if(this.sportsForm.valid){
      const dimensions = this.sportsForm.value.sportsDimension.split('\n');
      const sportsName = this.sportsForm.value.sportsName
      this.dialogRef.close([sportsName,dimensions]);
    }
  }
}
