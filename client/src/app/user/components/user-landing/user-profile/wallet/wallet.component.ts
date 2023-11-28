import { Component } from '@angular/core';
import { UserService } from 'src/app/user/service/user.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent{

   walletAmount:string=''
   constructor(private userService:UserService){}
   ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next:(res:any)=>{
        this.walletAmount = res.profileData.wallet
      },
      error:(err:any) =>{
        console.log(err);

      }
    })
   }
}
