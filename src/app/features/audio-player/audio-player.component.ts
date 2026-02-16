import { Component, computed, ElementRef, inject, signal, Signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartButtonComponent } from '../../shared/components/cart-button.component';
import { numberToCurrency } from '../../shared/helpers/number-to-currency';
import { CartService } from '../cart/cart.service';
import { ProductApiService } from '../product/product-api.service';
import { PreviousButtonComponent } from './components/previous-button.component';
import { NextButtonComponent } from './components/next-button.component';
import { PlayButtonComponent } from './components/play-button.component';
import { AudioPlayerService } from './audio-player.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [
    PreviousButtonComponent,
    NextButtonComponent,
    PlayButtonComponent,
    CartButtonComponent,
    NgClass,
  ],
  template: `
    @if (audioPlayer.currentTrack(); as track) {
      <div class="audio-player">
        @if (audioPlayer.currentArtwork(); as artwork) {
          <img
            tabindex="0"
            class="audio-player__artwork"
            [src]="artwork"
            alt="artwork"
            width="60px"
            height="60px"
            (click)="navigateToDetailView()"
            (keydown.enter)="navigateToDetailView()"
            (keydown.space)="navigateToDetailView()"
          />
        }

        <div class="audio-player__player">
          <div class="player__controls">
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
          </div>

          <div class="player__position">
            {{ track.position + 1 }}/{{ audioPlayer.playlist()?.tracks?.length }}
          </div>

          <div class="player__time">{{ currentTime() }}</div>

          <div #trackTitle class="player__track-title">
            <div
              class="animation-wrapper"
              [ngClass]="moveTitle() ? 'animation-running' : 'animation-paused'"
            >
              <span class="track-title-text">{{ track.title }}</span>
            </div>
          </div>

          <div class="player__progress-bar">
            <input
              id="audio-progress"
              #audioProgress
              class="player__progress-bar-input"
              type="range"
              min="0"
              max="100"
              [value]="progress()"
              [style]="'--progress:' + progress() + '%'"
              (input)="updateRangeProgress(audioProgress)"
            />
          </div>
        </div>

        <div
          tabindex="0"
          class="audio-player__add-to-cart"
          (click)="addToCart()"
          (keydown.enter)="addToCart()"
          (keydown.space)="addToCart()"
        >
          <app-cart-button></app-cart-button>
          <div class="product-price">
            {{ price }}
          </div>
        </div>
      </div>
    }
  `,
})
export class AudioPlayerComponent {
  private readonly _router = inject(Router);
  private readonly _cartService = inject(CartService);
  private readonly _productApiService = inject(ProductApiService);

  readonly audioPlayer = inject(AudioPlayerService);

  trackTitleElement = viewChild<ElementRef<HTMLDivElement>>('trackTitle');
  moveTitle = signal(false);

  get price(): string | undefined {
    return numberToCurrency(Number(this.audioPlayer.playlist()?.productPrice.amount));
  }

  get productId(): number | undefined {
    return this.audioPlayer.playlist()?.productId;
  }

  get progress(): Signal<number> {
    return this.audioPlayer.progress;
  }

  readonly currentTime = computed<string>(() => {
    const minutes = Math.floor(this.audioPlayer.currentTime() / 60);
    const seconds = Math.floor(this.audioPlayer.currentTime() % 60);
    const displayedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${displayedSeconds}`;
  });

  constructor() {
    this.moveOnTitleOverflow();
  }

  navigateToDetailView(): void {
    if (!this.productId) {
      return;
    }
    this._router.navigate(['release', this.productId]);
  }

  moveOnTitleOverflow(): void {
    toObservable(this.audioPlayer.playbackState).subscribe(() => {
      const trackTitle = this.trackTitleElement()?.nativeElement;
      if (trackTitle && trackTitle?.scrollWidth > trackTitle?.clientWidth) {
        this.moveTitle.set(true);
      } else {
        this.moveTitle.set(false);
      }
    });
  }

  updateRangeProgress(input: HTMLInputElement): void {
    const val = parseFloat(input.value) || 0;
    const progress = (val / 100) * 100;

    input.style.setProperty('--progress', progress + '%');

    this.audioPlayer.seekToPercentage(Number(input.value));
  }

  addToCart(): void {
    if (!this.productId) {
      return;
    }

    this._productApiService
      .getProduct(this.productId)
      .subscribe((product) => this._cartService.addItem(product, 1));
  }
}
