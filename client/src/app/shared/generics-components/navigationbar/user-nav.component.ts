import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent {
  @Input() isAdmin!:boolean;
  @Input() isLoggedIn!:boolean;
  isSidenavOpen: boolean = false;

  onToggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }


}
