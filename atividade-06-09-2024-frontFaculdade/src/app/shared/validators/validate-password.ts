import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ValidatePassword(reference: any = ''): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let res = null;
    if (control.parent) {
      const compareControl = (control.parent?.controls as any)[
        reference
      ] as AbstractControl;
      if (reference === 'password') {
        if (control.value !== compareControl.value) {
          res = { unmatchPassword: true };
        }
      } else {
        if (compareControl) {
          compareControl.updateValueAndValidity();
        }
      }
    }
    return res;
  };
}
