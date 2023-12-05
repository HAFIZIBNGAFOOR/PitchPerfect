import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../../admin-service/admin-service.service';
import { Sports } from '../../../admin-state/admin.interface';
import { ColumnType } from '../../../../shared/models/shared-model';

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
  availableSports!:any;
  columnData:ColumnType ={
    columns:[
      {dataProperty:'sportsName',title:'Name of Sports',sortable:false,filterable:false},
      {dataProperty:'sportsDimension',title:'Dimension of Sports',sortable:false,filterable:false},
      {dataProperty:'actions',title:'Actions',sortable:false,filterable:false}
    ],
    rowActions:[
      {label:'',dataProperty:'',actionIdtoReturn:''}
    ],
    rowsPerPage:''
  }
  constructor(private dialog:MatDialog, private fb:FormBuilder,private adminService:AdminService,private snackbar:MatSnackBar ){}

  ngOnInit(): void {  
    this.adminService.getSportsList().subscribe({
      next:(res:any)=>{
       const sportsData = res.sports.map((sport:any)=>({
          sportsName : sport.sportsName,
          sportsDimension : sport.sportsDimensions,
          actions : 'Edit' ,
          color:"primary"
      }))
      this.availableSports =  sportsData  
      },
      error:(err:any)=>{
        console.log(err);
      }
    }) 
    this.sportsData = {sportsName:null,sportsDimension:null};
    this.sportsForm = this.fb.group({
      sportsName:['',[Validators.required,Validators.pattern('^.{4,}$')]],
      sportsDimension:['',[Validators.required]]
    })
  }
  sportsDialog(){
    this.dialogRef = this.dialog.open(this.sportsDialogOpen,{
      height:'60%',
      width:'50%',
    })
    this.dialogRef.afterClosed().subscribe({
      next:(res:any[])=>{
        this.sportsData.sportsName =res[0] ;
        this.sportsData.sportsDimension = res[1]
        if(this.sportsData.sportsDimension && this.sportsData.sportsName){
          this.adminService.addSports(this.sportsData).subscribe({
            next:(res:any)=>{
                this.snackbar.open('Sports Added successfully','close',{
                  duration:3000
                })
            },
            error:(err)=>{
              this.error = err.error.message 
              this.snackbar.open(err.error.message,'close',{
                duration:3000
              })           
            }         
          })
        }        
      }
    })
  }

  onSubmit(){
    if(this.sportsForm.valid){
      const dimensions = this.sportsForm.value.sportsDimension.split('\n');
      const sportsName = this.sportsForm.value.sportsName
      this.dialogRef.close([sportsName,dimensions]);
    }else{
      this.error = 'Enter a valid field';
    }
  }
}
