import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-next-button',
  standalone: true,
  template: `
    <button
      class="audio-player__next-button"
      [disabled]="disabled()"
      (click)="onClick()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        viewBox="0 -960 960 960"
        width="20px"
        class="audio-player__next-icon"
      >
        <path d="M648-240v-480h72v480h-72Zm-408-24v-432l336 216-336 216Z" />
      </svg>
    </button>
  `,
})
export class NextButtonComponent {
  readonly disabled = input<boolean>(false);
  readonly clicked = output<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
