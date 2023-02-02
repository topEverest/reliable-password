import {FormControl} from "@angular/forms";

export interface Form {
  password: FormControl;
}

export type Status = 'easy' | 'medium' | 'strong' | null;
