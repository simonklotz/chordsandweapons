import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-play-button',
  standalone: true,
  template: `
    <button class="audio-player__play-button" (click)="onClick()">
      @if (isPlaying()) {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="#000000"
        >
          <path d="M564-228v-504h168v504H564Zm-336 0v-504h168v504H228Z" />
        </svg>
      } @else {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="#000000"
        >
          <path d="M336-216v-528l408 264-408 264Z" />
        </svg>
      }
    </button>
  `,
})
export class PlayButtonComponent {
  readonly isPlaying = input<boolean>(false);
  readonly clicked = output<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
