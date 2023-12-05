import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './generics-components/login/login.component';
import { SignupComponent } from './generics-components/signup/signup.component';
import { VerifyOTPComponent } from './generics-components/verify-otp/verify-otp.component';

import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSortModule} from '@angular/material/sort';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { NgOtpInputModule } from 'ng-otp-input';
import { MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TableComponent } from './generics-components/table/table.component';
import { IsBlockedComponent } from './generics-components/is-blocked/is-blocked.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NavbarComponent } from './generics-components/navbar/navbar.component';
import { MapDiologComponent } from './generics-components/map-diolog/map-diolog.component';
import { TurfCardComponent } from './generics-components/turf-card/turf-card.component';
import { MatMenuModule} from '@angular/material/menu';
import { MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './generics-components/profile/profile.component';
import { ProfileEditComponent } from './generics-components/profile-edit/profile-edit.component';
import { ExpansionPanelComponent } from './generics-components/expansion-panel/expansion-panel.component';
import { MatExpansionModule} from '@angular/material/expansion';
import { ConfirmationDiologComponent } from './generics-components/confirmation-diolog/confirmation-diolog.component';
import { NavigationMapComponent } from './generics-components/navigation-map/navigation-map.component';
import { BallSpinnerComponent } from './generics-components/ball-spinner/ball-spinner.component';
import { DashboardComponent } from './generics-components/dashboard/dashboard.component';




@NgModule({
  providers:[
    
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    VerifyOTPComponent,
    TableComponent,
    IsBlockedComponent,
    NavbarComponent,
    MapDiologComponent,
    TurfCardComponent,
    ProfileComponent,
    ProfileEditComponent,
    ExpansionPanelComponent,
    ConfirmationDiologComponent,
    NavigationMapComponent,
    BallSpinnerComponent,
    DashboardComponent,
    // SpinnerComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    RouterModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    MatMenuModule,
    MatDialogModule,
    MatExpansionModule
  ],
  exports:[
    LoginComponent,
    SignupComponent,
    VerifyOTPComponent,
    TableComponent,
    IsBlockedComponent,
    NavbarComponent,
    TurfCardComponent,
    ProfileComponent,
    ExpansionPanelComponent,
    ConfirmationDiologComponent,
    NavigationMapComponent,
    BallSpinnerComponent,
    DashboardComponent
  ]
})
export class SharedModule {}
