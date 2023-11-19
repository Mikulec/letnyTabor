import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const atLeastOneTrueValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const values = Object.values(control.value);
  return values.includes(true) ? null : { atLeastOneTrue: true };
};
