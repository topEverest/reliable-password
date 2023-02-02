import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Status} from "../interfaces/interfaces";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-password-status',
  templateUrl: './password-status.component.html',
  styleUrls: ['./password-status.component.scss']
})
export class PasswordStatusComponent implements OnChanges {

  @Input() passwordControl!: FormControl;
  @Input() password = '';
  @Output() validForm = new EventEmitter<boolean>();
  status: Status = null;

  easyPassword
    = /((?=.*[a-z])(?=.{8,}))|((?=.*[0-9])(?=.{8,}))|((?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])(?=.{8,}))/;
  mediumPassword
    = /((?=.*[a-z])(?=.*[0-9])(?=.{8,}))|((?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])(?=.{8,}))|((?=.*[0-9])(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])(?=.{8,}))/;
  strongPassword
    = /(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])(?=.*[a-z])(?=.*[0-9])(?=.{8,})/;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['password'].currentValue !== changes?.['password'].previousValue) {
      this.updateAndResetSections(this.password);
    }
  }

  updateAndResetSections(password: string): void {

    // Hide all sections if value.length < 8
    if (password?.length < 8) {
      this.updateSections(null, true);
    }

    // Show section 'easy'
    if (this.easyPassword.test(password)) {
      this.updateSections('easy', false);
    }

    // Show section 'medium'
    if (this.mediumPassword.test(password)) {
      this.updateSections('medium', false);
    }

    // Show section 'strong'
    if (this.strongPassword.test(password)) {
      this.updateSections('strong', false);
    }
  }

  updateSections(status: Status, validForm: boolean = true): void {
    this.status = status;
    this.validForm.emit(validForm);
  }
}
