import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PreferredSportComponent } from './features/components/preferred-sport/preferred-sport.component';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormErrorPipe } from './features/pipes/form-error.pipe';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PreferredSportComponent,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormErrorPipe,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  viewProviders: [AppService],
})
export class AppComponent {
  readonly form = this.appService.createForm();
  readonly appPreferedSportControlsModel =
    this.appService.appPreferedSportControls;

  constructor(public appService: AppService) {}

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this.appService.formSubmittedAsInvalid.set(true);
      window.alert('Formulár je zle vyplnený.');
    } else {
      window.alert('Formulár je správne vyplnený.');
    }
  }
}
