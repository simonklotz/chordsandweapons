import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="app-dialog-surface" role="dialog" aria-modal="true">
      <form [formGroup]="form" class="search" (ngSubmit)="onSubmit()">
        <input
          id="search-input"
          class="input search__input"
          type="text"
          placeholder="Search ..."
          formControlName="search"
        />
        <button type="submit" class="button search__button-search" [disabled]="form.invalid">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="search-icon">
            <path
              d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
            />
          </svg>
        </button>
        <button type="button" class="button search__button-close" (click)="onClose()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            class="search-close-icon"
          >
            <path
              d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
            />
          </svg>
        </button>
      </form>
    </div>
  `,
})
export class SearchComponent {
  private readonly _formBuilder = inject(NonNullableFormBuilder);
  private readonly _dialogRef = inject(DialogRef<string>);

  form = this._formBuilder.group({
    search: ['', [Validators.required, Validators.minLength(2)]],
  });

  onSubmit(): void {
    if (this.form.valid) {
      const searchQuery = this.form.value.search;
      this._dialogRef.close(searchQuery);
    } else {
      this.form.markAllAsTouched();
    }
  }

  onClose(): void {
    this._dialogRef.close();
  }
}
