import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-play-button',
  standalone: true,
  template: `
    <div
      tabindex="0"
      class="play-button"
      (click)="onClick($event)"
      (keydown.enter)="onClick($event)"
      (keydown.space)="onClick($event)"
    >
      @if (isPlaying()) {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          [attr.width]="width()"
          [attr.height]="height()"
          class="pause-icon"
        >
          <path
            d="M556.67-200v-560h170v560h-170Zm-323.34 0v-560h170v560h-170Z"
          />
        </svg>
      } @else {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          [attr.width]="width()"
          [attr.height]="height()"
          class="play-icon"
        >
          <path d="M320-202v-560l440 280-440 280Z" />
        </svg>
      }
    </div>
  `,
})
export class PlayButtonComponent {
  readonly isPlaying = input<boolean>(false);
  readonly opticalSize = input<number>(20);

  readonly clicked = output<Event>();

  readonly width = computed(() => this.opticalSize() + 'px');
  readonly height = computed(() => this.opticalSize() + 'px');

  onClick(event: Event): void {
    this.clicked.emit(event);
  }
}
