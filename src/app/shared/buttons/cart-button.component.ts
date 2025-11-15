import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-cart-button',
  standalone: true,
  template: `
    <button
      class="cart-button"
      [disabled]="disabled()"
      (click)="onClick($event)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        [attr.width]="width()"
        [attr.height]="height()"
        class="cart-icon"
      >
        <path
          d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"
        />
      </svg>
    </button>
  `,
})
export class CartButtonComponent {
  readonly disabled = input<boolean>(false);
  readonly opticalSize = input<number>(24);

  readonly clicked = output<Event>();

  readonly width = computed(() => this.opticalSize() + 'px');
  readonly height = computed(() => this.opticalSize() + 'px');

  onClick(event: Event): void {
    this.clicked.emit(event);
  }
}
