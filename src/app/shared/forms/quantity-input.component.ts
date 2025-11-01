import { Component, computed, effect, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quantity-input',
  standalone: true,
  template: `
    <div class="quantity-input">
      <button
        class="button quantity-input__button quantity-input__button-left"
        type="button"
        [disabled]="isDisabled() || isDecreasingDisabled()"
        (click)="onDecrease()"
      >
        -
      </button>
      <input
        #quantityInput
        class="quantity-input__input-field"
        type="number"
        min="1"
        [value]="quantity()"
        [disabled]="isDisabled()"
        (keydown)="onKeydown($event)"
        (input)="onInput(quantityInput.value)"
      />
      <button
        class="button quantity-input__button quantity-input__button-right"
        type="button"
        [disabled]="isDisabled()"
        (click)="onIncrease()"
      >
        +
      </button>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: QuantityInputComponent,
    },
  ],
})
export class QuantityInputComponent implements ControlValueAccessor {
  decrease = input<Observable<void>>();
  increase = input<Observable<void>>();

  quantity = signal(1);
  isDisabled = signal(false);
  isDecreasingDisabled = computed(() => this.quantity() < 1);

  constructor() {
    effect(() => {
      this.increase()?.subscribe(() => this.onIncrease());
    });
    effect(() => {
      this.decrease()?.subscribe(() => this.onDecrease());
    });
  }

  onDecrease(): void {
    if (this.quantity() > 0) {
      this.quantity.set(this.quantity() - 1);
    }
    this.onChange(this.quantity());
    this.onTouched();
  }

  onIncrease(): void {
    if (this.quantity() < 999) {
      this.quantity.set(this.quantity() + 1);
    }
    this.onChange(this.quantity());
    this.onTouched();
  }

  onKeydown(event: KeyboardEvent) {
    const numericKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const specialKeys = [
      'Tab',
      'Enter',
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
    ];
    const allowedKeys = [...numericKeys, ...specialKeys];

    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  onInput(value: string): void {
    const numericValue = Number(value);
    this.quantity.set(numericValue);
    this.onChange(numericValue);
    this.onTouched();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (value: number) => {
    /** `View -> model callback called when field has been changed` */
  };

  onTouched = () => {
    /** `View -> model callback called when field has been touched` */
  };

  writeValue(value: number): void {
    this.quantity.set(value);
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}
