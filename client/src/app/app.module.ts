import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatTabsModule} from '@angular/material/tabs';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRoutingModule } from './user/user-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { UserModule } from './user/user.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './user/state/user.effects';
import { NgOtpInputModule } from 'ng-otp-input';
import { AngularFireAuthModule}  from '@angular/fire/compat/auth'
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { TurfAdminRoutingModule } from './turf-admin/turf-admin-routing.module';
import { TurfAdminModule } from './turf-admin/turf-admin.module';
import { AdminModule } from './admin/admin.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { AdminEffects } from './admin/admin-state/admin.effects';
import { TurfAdminEffects } from './turf-admin/state/turf-admin.effects';
import { UserOrdersComponent } from './user/components/user-landing/user-profile/user-bookings/user-orders.component';
import { HttpClientModule } from '@angular/common/http';
import { Constants } from './config/constants';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

const firebaseConfig = {
  apiKey: "AIzaSyDO7Rgjpl5BrlFiVy_-sQkNdcAhe7GNigs",
  authDomain: "pitchperfect-f99d3.firebaseapp.com",
  projectId: "pitchperfect-f99d3",
  storageBucket: "pitchperfect-f99d3.appspot.com",
  messagingSenderId: "497675220962",
  appId: "1:497675220962:web:0ea6ece56a11589530abbb",
  measurementId: "G-WRC3VW4QKB"
};


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // TurfAdminModule,
    // TurfAdminRoutingModule,
    // UserRoutingModule,
    // AdminModule,
    // AdminRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    MatDialogModule ,
    MatMenuModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([UserEffects,AdminEffects,TurfAdminEffects]),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    Constants
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
