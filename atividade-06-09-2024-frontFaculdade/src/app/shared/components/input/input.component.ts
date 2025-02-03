import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input({ required: true }) touched: boolean = false;
  @Input({ required: true }) placeholder: string = '';
  @Input({ required: true }) name: string = '';
  @Input({ required: false }) type: string = 'text';
  @Input({ required: false }) label: string = '';
  @Input({ required: false }) errors: ValidationErrors | null = null;

  value: string = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  teste() {
    console.log('this.errors :>> ', this.errors);
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  updateValue(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement) {
      const value = inputElement.value;
      this.value = value;
      this.onChange(value);
      this.onTouched();
    }
  }
}
