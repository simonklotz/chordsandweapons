import { Component, inject } from '@angular/core';
import { CartButtonComponent } from '../../shared/buttons/cart-button.component';
import { CartService } from '../cart/cart.service';
import { ProductApiService } from '../product/product-api.service';
import { PreviousButtonComponent } from './components/previous-button.component';
import { NextButtonComponent } from './components/next-button.component';
import { PlayButtonComponent } from './components/play-button.component';
import { AudioPlayerService } from './audio-player.service';
import { numberToCurrency } from '../../shared/helpers/number-to-currency';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [PreviousButtonComponent, NextButtonComponent, PlayButtonComponent, CartButtonComponent],
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

        <div
          tabindex="0"
          class="audio-player__add-to-cart"
          (click)="addToCart()"
          (keydown.enter)="addToCart()"
          (keydown.space)="addToCart()"
        >
          <app-cart-button></app-cart-button>
          <div class="audio-player__product-price">
            {{ price }}
          </div>
        </div>
      </div>
    }
  `,
})
export class AudioPlayerComponent {
  private readonly _cartService = inject(CartService);
  private readonly _productApiService = inject(ProductApiService);

  readonly audioPlayer = inject(AudioPlayerService);

  get price(): string | undefined {
    return numberToCurrency(Number(this.audioPlayer.playlist()?.productPrice.amount));
  }

  get currencyCode(): string | undefined {
    return this.audioPlayer.playlist()?.productPrice.currencyCode;
  }

  get productId(): number | undefined {
    return this.audioPlayer.playlist()?.productId;
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
