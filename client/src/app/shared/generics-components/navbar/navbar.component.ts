import { Component, Input, inject,Output, EventEmitter, TemplateRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';


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
  constructor(private dialog:MatDialog){}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.HandsetPortrait)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    logoutClicked(){
      if(this.isAdmin){
        this.isLogout.emit('turf-admin')
      }else{
        this.isLogout.emit('user')
      }
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
