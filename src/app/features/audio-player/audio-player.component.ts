import { Component, inject } from '@angular/core';
import { AudioPlayerService } from './audio-player.service';
import { PreviousButtonComponent } from './components/previous-button.component';
import { NextButtonComponent } from './components/next-button.component';
import { PlayButtonComponent } from './components/play-button.component';
import { CurrencyPipe } from '@angular/common';
import { CartButtonComponent } from '../../shared/buttons/cart-button.component';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [
    PreviousButtonComponent,
    NextButtonComponent,
    PlayButtonComponent,
    CurrencyPipe,
    CartButtonComponent,
  ],
  template: `
    @if (audioPlayer.currentTrack(); as track) {
      <div class="audio-player">
        @if (audioPlayer.currentArtwork(); as artwork) {
          <img
            class="audio-player__artwork"
            [src]="artwork"
            alt="artwork"
            width="50px"
            height="50px"
          />
        }

        <app-previous-button
          [disabled]="!audioPlayer.hasPrevious()"
          (clicked)="audioPlayer.previous()"
        ></app-previous-button>
        <app-play-button
          [isPlaying]="audioPlayer.isPlaying()"
          (clicked)="audioPlayer.togglePlayPause()"
        ></app-play-button>
        <app-next-button
          [disabled]="!audioPlayer.hasNext()"
          (clicked)="audioPlayer.next()"
        ></app-next-button>

        <div class="audio-player__track-info">
          {{ track.position }}/{{ audioPlayer.playlist()?.tracks?.length }}
          {{ track.title }}
        </div>

        @if (false) {
          <progress
            class="audio-player__progress"
            [value]="audioPlayer.progress()"
            max="100"
          ></progress>
        }

        <div class="audio-player__add-to-cart">
          <app-cart-button></app-cart-button>
          <div class="audio-player__product-price">
            {{ price | currency: currencyCode : true }}
          </div>
        </div>
      </div>
    }
  `,
})
export class AudioPlayerComponent {
  readonly audioPlayer = inject(AudioPlayerService);

  get price(): string | undefined {
    return this.audioPlayer.playlist()?.productPrice.amount;
  }

  get currencyCode(): string | undefined {
    return this.audioPlayer.playlist()?.productPrice.currencyCode;
  }
}
