import { Component, Input, inject,Output, EventEmitter, TemplateRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import * as alertify from 'alertifyjs'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  diolofRef:any
  private breakpointObserver = inject(BreakpointObserver);
  @Input() isAdmin!:boolean;
  @Input() isLoggedIn!:boolean;
  @Output() isLogout = new EventEmitter();
  constructor(){}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.HandsetPortrait)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    ngOnInit(): void {
      console.log(this.isLoggedIn,' this is isLogged in');
      
    }
    logoutClicked(){
      alertify.confirm("Logout","Are you sure ?",()=>{
        if(this.isAdmin){
          this.isLogout.emit('turf-admin')
          alertify.success('Turf admin Logged out ' )
        }else{
          this.isLogout.emit('user')
          alertify.success(' user Logged out ' )
        }
      },()=>{ 
        alertify.error('cancelled')
      }
      ).set({'transiton':'slide','labels':{ok:'Proceed',cancel:'Cancel'}}  )

    }
    // confirmLogout(){
    //   if(this.isAdmin){
    //     this.isLogout.emit('turf-admin')
    //   }else{
    //     this.isLogout.emit('user')
    //   }
    //   this.dialog.closeAll()
    //   // this.dialogRef.close()
    // }
}
