import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-previous-button',
  standalone: true,
  template: `
    <button
      class="audio-player__previous-button"
      [disabled]="disabled()"
      (click)="onClick()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        viewBox="0 -960 960 960"
        width="20px"
        class="audio-player__previous-icon"
      >
        <path d="M240-240v-480h72v480h-72Zm480-24L384-480l336-216v432Z" />
      </svg>
    </button>
  `,
})
export class PreviousButtonComponent {
  readonly disabled = input<boolean>(false);

  readonly clicked = output<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
