import {AfterViewInit, Component, forwardRef, Injector, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl} from "@angular/forms";
import {MyErrorStateMatcher} from "../additional-classes/error-state-matcher";

@Component({
  selector: 'app-custom-password-input',
  templateUrl: './custom-password-input.component.html',
  styleUrls: ['./custom-password-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomPasswordInputComponent),
    multi: true
  }]
})
export class CustomPasswordInputComponent implements OnInit, ControlValueAccessor, AfterViewInit {

  constructor(public injector: Injector) {
  }

  customPasswordInput = new FormControl();
  matcher = new MyErrorStateMatcher();
  onChange = (val: string) => {};
  onTouch = () => {};

  ngOnInit(): void {
    this.customPasswordInput.valueChanges.subscribe(res => {
      if (this.onChange) {
        this.onChange(res);
      }
    });
  }

  ngAfterViewInit(): void {
    const ngControl = this.injector.get(NgControl, null);
    if (ngControl) {
      setTimeout(() => {
        this.customPasswordInput = ngControl.control as FormControl;
      })
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: string): void {
    if (this.customPasswordInput && this.customPasswordInput.value !== value) {
      this.customPasswordInput.setValue(value);
    }
  }
}
