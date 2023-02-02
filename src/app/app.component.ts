import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SuccessPasswordSnackBarComponent} from "./success-password-snack-bar/success-password-snack-bar.component";
import {Form} from "./interfaces/interfaces";
import {distinctUntilChanged, map} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar) {
  }

  form!: FormGroup;
  passwordInputString!: string;
  control!: FormControl;
  disableButton = true;

  ngOnInit(): void {
    this.form = new FormGroup<Form>({
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });

    // @ts-ignore
    this.control = this.form.get('password');

    this.password?.valueChanges
      .pipe(
        // prevent whitespaces
        distinctUntilChanged(),
        map((value: string) => value.toLowerCase().replace(/\s/g, ''))
      ).subscribe((password: string) => {
      this.resetOrUpdateInput(password);
    });
  }

  // Clear form from value, errors, disable sections and show success snackbar
  go(): void {
    this.resetOrUpdateInput('');
    this.password?.setErrors(null);

    this._snackBar.openFromComponent(SuccessPasswordSnackBarComponent, {
      duration: 4000,
    });
  }

  resetOrUpdateInput(str: string): void {
    this.password?.patchValue(str);
    this.passwordInputString = str;
  }

  get password() {
    return this.form.get('password');
  }
}
