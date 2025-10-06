import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, NgOptimizedImage],
  template: `
    <div class="app-dialog-surface" role="dialog" aria-modal="true">
      <form [formGroup]="form" class="form search-form" (ngSubmit)="onSubmit()">
        <input
          id="search-input"
          class="search-input"
          type="text"
          placeholder="Search ..."
          formControlName="search"
        />
        <button
          type="submit"
          class="button button__search"
          [disabled]="form.invalid"
        >
          <img
            ngSrc="icons/search_32dp.svg"
            alt="search submit"
            width="32"
            height="32"
          />
        </button>
        <button type="button" class="button button__close" (click)="onClose()">
          <img
            ngSrc="icons/close_32dp.svg"
            alt="close dialog"
            width="32"
            height="32"
          />
        </button>
      </form>
    </div>
  `,
})
export class SearchComponent {
  private readonly _formBuilder = inject(NonNullableFormBuilder);
  private readonly _dialogRef = inject(DialogRef<string>);

  form = this._formBuilder.group({
    search: ['', [Validators.required]],
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
