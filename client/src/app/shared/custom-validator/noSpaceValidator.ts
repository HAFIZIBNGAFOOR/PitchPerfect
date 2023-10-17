import { AbstractControl, ValidatorFn } from '@angular/forms';

export function noSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const hasSpaces = (control.value || '').trim().indexOf(' ') !== -1;
    return hasSpaces ? { 'spacesNotAllowed': true } : null;
  };
}
