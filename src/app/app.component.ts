import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SuccessPasswordSnackBarComponent} from "./success-password-snack-bar/success-password-snack-bar.component";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar) {
  }

  matcher = new MyErrorStateMatcher();
  form!: FormGroup;

  easy = false;
  medium = false;
  strong = false;
  validForm = false;
  easyPassword
    = /((?=.*[a-z])(?=.{8,}))|((?=.*[0-9])(?=.{8,}))|((?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])(?=.{8,}))/;
  mediumPassword
    = /((?=.*[a-z])(?=.*[0-9])(?=.{8,}))|((?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])(?=.{8,}))|((?=.*[0-9])(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])(?=.{8,}))/;
  strongPassword
    = /(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])(?=.*[a-z])(?=.*[0-9])(?=.{8,})/;

  ngOnInit(): void {
    this.form = new FormGroup<any>({
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  checkPassword() {

    // Here we get value and prevent entering whitespaces by .replace
    const value = this.form.get('password')?.value.toLowerCase().replace(/\s/g, '');
    this.form.get('password')?.patchValue(value.replace(/\s/g, ''));

    // Hide all sections if value.length < 8
    if (value.length < 8) {
      this.easy = this.medium = this.strong = false;
      this.validForm = false;
    }

    // Show section 'easy'
    if (this.easyPassword.test(value)) {
      this.strong = false;
      this.medium = false;
      this.easy = true;
      this.validForm = true;
    }

    // Show section 'medium'
    if (this.mediumPassword.test(value)) {
      this.easy = false;
      this.strong = false;
      this.medium = true;
      this.validForm = true;
    }

    // Show section 'strong'
    if (this.strongPassword.test(value)) {
      this.easy = false;
      this.medium = false;
      this.strong = true;
      this.validForm = true;
    }
  }

  // Clear form from value, sections and errors and show success snackbar
  go() {
    // this.form.reset();
    this.form.get('password')?.setValue('');
    this.form.get('password')?.setErrors(null);
    this.validForm = false;
    this.easy = this.medium = this.strong = false;

    this._snackBar.openFromComponent(SuccessPasswordSnackBarComponent, {
      duration: 4000,
    });
  }

  get password() {
    return this.form.get('password');
  }
}





