import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

// Custom validator function for checking if the field contains only empty spaces
export const notOnlySpacesValidator = (control: AbstractControl): { [key: string]: boolean } | null => {
  if (control.value && control.value.trim() === '') {
    return { 'onlySpaces': true };
  }
  return null;
};
