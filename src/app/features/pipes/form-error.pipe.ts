import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'formError',
  standalone: true,
  pure: false,
})
export class FormErrorPipe implements PipeTransform {
  transform(formControl: AbstractControl | null) {
    if (formControl?.hasError('required')) {
      return 'Táto hodnota musí byť vyplnená';
    } else if (formControl?.hasError('pattern')) {
      return 'Táto hodnota je zle vyplnená';
    } else if (formControl?.hasError('atLeastOneTrue')) {
      return 'Aspoň jedna hodnota musí byť vyplnená';
    } else if (formControl?.hasError('maxlength')) {
      return 'Bola prekročená maximálna dĺžka textu';
    }

    return '';
  }
}
