import { Injectable, signal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { atLeastOneTrueValidator } from './features/validators/at-least-one.validator';
import { PreferredSportControl } from './features/components/preferred-sport/preferred-sport.component';

const MAX_LENGTH = {
  name: 25,
  lastname: 50,
  note: 4000,
};
@Injectable()
export class AppService {
  public formSubmittedAsInvalid = signal(false);

  public appPreferedSportControls: PreferredSportControl[] = [
    { key: 'football', label: 'futbal' },
    { key: 'volleyball', label: 'volejbal' },
    { key: 'swimming', label: 'plavanie' },
    { key: 'badminton', label: 'bedbinton' },
    { key: 'tabletennis', label: 'stolný tenis' },
  ];

  public createForm() {
    return new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(MAX_LENGTH.name),
        Validators.pattern('^[a-zA-Z]*$'),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.maxLength(MAX_LENGTH.lastname),
        Validators.pattern('^[a-zA-Z]*$'),
      ]),
      age: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\d+$'),
      ]),
      appPreferedSport: new FormControl(
        {
          volleyball: false,
          football: false,
          swimming: false,
          badminton: false,
          tabletennis: false,
        },
        { validators: atLeastOneTrueValidator }
      ),
      alreadyWas: new FormControl(false),
      note: new FormControl('', [Validators.maxLength(MAX_LENGTH.note)]),
    });
  }
}
