import { Component, computed, input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-ticker',
  standalone: true,
  imports: [NgStyle],
  template: `
    <div class="ticker">
      <div class="ticker__track" [ngStyle]="trackStyles()">
        <span class="ticker__text">{{ repeatedText() }}</span>
        <span class="ticker__text" aria-hidden="true">{{ repeatedText() }}</span>
      </div>
    </div>
  `,
})
export class TickerComponent {
  text = input.required<string>();
  speed = input<number>(50);
  direction = input<'left' | 'right'>('left');

  readonly repeatedText = computed(() => {
    const text = this.text();
    return Array(15)
      .fill(text.trim() + '\xa0')
      .join('');
  });

  readonly trackStyles = computed(() => ({
    '--ticker-speed': `${this.speed()}s`,
    '--ticker-direction': this.direction(),
  }));
}
