import { Component } from '@angular/core';
import { UserService } from 'src/app/user/service/user.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent{
    isInitialized:boolean =false;
    walletDetails:any;
    walletAmount!:number
   constructor(private userService:UserService){}
   ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next:res=>{
        console.log(res,' tis is response ');
        this.isInitialized = true
        this.walletAmount = res.profileData.wallet
        this.walletDetails = res.profileData.walletStatements
      },
      error:(err:any) =>{
        console.log(err);

      }
    })
   }
}
