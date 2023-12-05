import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TurfAdminService } from 'src/app/turf-admin/turf-admin-service/turf-admin.service';

@Component({
  selector: 'app-turf-wallet',
  templateUrl: './turf-wallet.component.html',
  styleUrls: ['./turf-wallet.component.css']
})
export class TurfWalletComponent {
  profileSubscription !:Subscription
  walletDetails :any
  walletAmount!:number
  constructor(private turfAdminService:TurfAdminService){}

  ngOnInit(): void {
    this.profileSubscription=this.turfAdminService.getTurfAdminProfile().subscribe(
      res=>{
        console.log(res);
        this.walletDetails = res.profile.walletStatements ;
        this.walletAmount = res.profile.wallet
      }
    )
  }
  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe()
  }
}
