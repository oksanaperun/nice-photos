import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, NgForm } from '@angular/forms';

export class SearchTextErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: NgForm | null): boolean {
    const isSubmitted = form && form.submitted;

    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
