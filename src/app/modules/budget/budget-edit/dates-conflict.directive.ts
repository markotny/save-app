/* eslint-disable @typescript-eslint/no-use-before-define */
import {Directive} from '@angular/core';
import {NG_VALIDATORS, Validator, ValidationErrors, AbstractControl} from '@angular/forms';

@Directive({
  selector: '[appDatesConflict]',
  providers: [{provide: NG_VALIDATORS, useExisting: DatesConflictDirective, multi: true}]
})
export class DatesConflictDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    if (!control || !control.parent) {
      return;
    }
    const form = control.parent;
    const start = form.get('startDate');
    const end = form.get('endDate');

    if (!start || !end) {
      return;
    }
    return start.value > end.value ? {datesConflict: true} : null;
  }
}
