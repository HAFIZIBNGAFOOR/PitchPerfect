import { Component } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MatDialog } from '@angular/material/dialog';
import { MapDiologComponent } from '../../../../../shared/generics-components/map-diolog/map-diolog.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TurfAdminService } from '../../../../turf-admin-service/turf-admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
interface SelectedFile {
  file: File;
  url: string; 
}

@Component({
  selector: 'app-add-turf',
  templateUrl: './add-turf.component.html',
  styleUrls: ['./add-turf.component.css']
})
export class AddTurfComponent {
  selectedLocation:{
    long:string,
    lat:string,
    address:string
  }={
    long:'',
    lat:'',
    address:''
  }
  location !:any;
  turfForm!:FormGroup;
  selectedFile!:SelectedFile[];
  sports!:string[];
  dimensions!:any;
  sportsType!:any;
  addDimension:boolean=false;
  sportsDimension:any;
  loading : boolean = false;
  submitted:boolean =false;

  constructor (private matDialog:MatDialog , private fb:FormBuilder, private turfAdminService:TurfAdminService,private snackBar:MatSnackBar ,private router:Router){}
  ngOnInit(): void {
    this.turfAdminService.getSportsType().subscribe({
      next:(res:any)=>{
        this.sportsType = res.sports;
        this.sports = res.sports.map((sports:any)=>sports.sportsName);
      }
    })
   this.formValidation()
  }
  
  formValidation(){
    this.turfForm = this.fb.group({
      turfName:['',[Validators.required,Validators.pattern(/^.{4,}$/)]],
      turfLocation:['',[Validators.required]],
      turfContact:['',[Validators.required,Validators.pattern(/^\d{10}$/)]],
      turfFacilities:['',[Validators.required]],
      sportsDimension:['',[Validators.required]],
      sportsType:['',[Validators.required]],
      turfPrice:['',[Validators.required,Validators.pattern(/^\d{1,4}$/)]],
      turfImages: [[],[Validators.required]],
    })
  }
  openMatDialog(){
    const  matDialogRef = this.matDialog.open(MapDiologComponent,{
      width:'50%',
      height:'50%'
    })
    matDialogRef.afterClosed().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.selectedLocation.long = res[0].longitude
        this.selectedLocation.lat = res[0].latitude
        this.selectedLocation.address = res[1]
        this.location = res[1]
      }
    })
  }
  onFileSelected(file:any){
    const files = file.target.files
    if(files && files.length>0){
      const imagePreviews:any = []
      for(let i=0;i<files.length;i++){
        const file = files[i];

        const reader = new FileReader();
        reader.onload=(e:any)=>{
          imagePreviews.push({url:e.target.result,file});
          if(imagePreviews.length === files.length){
            this.turfForm.patchValue({
              turfImages:imagePreviews.map((image:any)=>image.file)
            });
            this.selectedFile = imagePreviews
          }
        }
        reader.readAsDataURL(file);
      }
    }
  }
  onSelected(ev:any){
    const selectedSports = ev.value
    this.dimensions = this.sportsType.filter((sports:any)=>sports.sportsName == selectedSports)
    this.sportsDimension = this.dimensions[0].sportsDimensions
    this.addDimension = true
  }
  onSubmit(){
    this.submitted =true
    
    if(this.turfForm.valid && this.selectedFile.length>0 ){
      const turfImages = this.turfForm.value.turfImages;
      const selectedLocationAsString = JSON.stringify(this.selectedLocation);

      const formData = new FormData();
      formData.append('turfName',this.turfForm.get('turfName')?.value)
      formData.append('turfLocation',selectedLocationAsString)
      formData.append('turfContact',this.turfForm.get('turfContact')?.value)
      formData.append('turfFacilities',this.turfForm.get('turfFacilities')?.value)
      formData.append('sportsDimension',this.turfForm.get('sportsDimension')?.value)
      formData.append('sportsType',this.turfForm.get('sportsType')?.value)
      formData.append('turfPrice',this.turfForm.get('turfPrice')?.value)

      for (let i = 0; i < turfImages.length; i++) {
        formData.append('turfImages', turfImages[i], turfImages[i].name);
      }
      this.loading = true;
      
      this.turfAdminService.addTurf(formData).subscribe({
        next:(value)=>{
          this.snackBar.open('New Turf added successfully ','Close',{
            duration:3000
          })
          this.loading = false
          setTimeout(()=>{
            this.router.navigate(['/turf-owner/manage-slots'])
          },3000)
        },
        error:(err:any)=>{
          this.loading = false
          this.snackBar.open(err.error.message,'Close',{
            duration:3000
          })
          if(err.status == 403) {
            this.snackBar.open('Cannot add Turf ,Turf Admin Not verified ','close',{
              duration:4000
            })
          }
          if(err.status == 404){
            this.snackBar.open('entered turf already exists','close',{
              duration:3000
            })
          }
        }       
      })
    }
  }
  performAction(){

  }
}
