import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {AppComponent} from './app.component';
import {SuccessPasswordSnackBarComponent} from './success-password-snack-bar/success-password-snack-bar.component';
import {PasswordStatusComponent} from './password-status/password-status.component';
import {CustomPasswordInputComponent} from './custom-password-input/custom-password-input.component';

@NgModule({
  declarations: [
    AppComponent,
    SuccessPasswordSnackBarComponent,
    PasswordStatusComponent,
    CustomPasswordInputComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
