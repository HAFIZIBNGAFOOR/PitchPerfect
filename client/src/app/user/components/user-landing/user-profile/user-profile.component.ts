import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {


  constructor(private userService:UserService, private router:Router){}
  ngOnInit(): void {
    // this.router.navigate(['user-profile'])
  }
}
