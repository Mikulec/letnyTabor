import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  forwardRef,
  Injector,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { AppService } from '../../../app.service';

export interface PreferredSportControl {
  key: string;
  label: string;
}

@Component({
  selector: 'app-preferred-sport',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, MatRadioModule],
  templateUrl: './preferred-sport.component.html',
  styleUrl: './preferred-sport.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PreferredSportComponent),
      multi: true,
    },
  ],
})
export class PreferredSportComponent
  implements ControlValueAccessor, AfterViewInit
{
  @Input({ required: true }) controls!: PreferredSportControl[];

  selected: { [key: string]: boolean } = {};
  ngControl?: NgControl;

  constructor(
    private readonly _injector: Injector,
    private readonly _appService: AppService
  ) {}

  ngAfterViewInit() {
    this.ngControl = this._injector.get(NgControl);
    if (this.ngControl !== null) {
      this.ngControl.valueChanges?.subscribe({
        next: () => this._appService.formSubmittedAsInvalid.set(false),
      });
    }
  }

  onChange = (value: { [key: string]: boolean }) => {};
  onTouch = () => {};

  onSelect(option: PreferredSportControl) {
    this.selected[option.key] = true;
    this.onChange(this.selected);
  }

  writeValue(value: { [key: string]: boolean }) {
    this.selected = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
}
