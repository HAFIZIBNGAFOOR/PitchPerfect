import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from './user/service/userAuth-gaurd/user-auth-guard.service';
import { IsBlockedComponent } from './shared/generics-components/is-blocked/is-blocked.component';

const routes: Routes = [
  {path:"blocked",component:IsBlockedComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
