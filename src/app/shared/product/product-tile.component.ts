import { Component, computed, inject, input, OnInit } from '@angular/core';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { Router } from '@angular/router';
import { ProductListItem } from '../../core/models/product-list-item.interface';
import { CartService } from '../../core/services/cart.service';
import { AudioPlayerService } from '../../features/audio-player/audio-player.service';
import { PlayButtonComponent } from '../../features/audio-player/components/play-button.component';

@Component({
  selector: 'app-product-tile',
  standalone: true,
  template: `
    <div class="product-tile">
      <div
        tabindex="0"
        class="product-tile__image"
        (click)="openDetailView()"
        (keydown.enter)="openDetailView()"
        (keydown.space)="openDetailView()"
      >
        <div
          class="product-image"
          [ngStyle]="{ 'background-image': 'url(' + imageUrl + ')' }"
        >
          <div class="product-image-overlay"></div>
          @if (hasTrackPreview) {
            <app-play-button
              [isPlaying]="isPlaying()"
              [opticalSize]="30"
              (clicked)="togglePlayPause($event)"
            ></app-play-button>
          }
        </div>
      </div>
      <div class="product-tile__body">
        <div
          class="product-info"
          tabindex="0"
          (click)="openDetailView()"
          (keydown.enter)="openDetailView()"
          (keydown.space)="openDetailView()"
        >
          <h3 class="product-info__title">{{ product().title }}</h3>
          <p class="product-info__artist">{{ product().artist }}</p>
          <p class="product-info__price">
            {{ price | currency: currencyCode }}
          </p>
        </div>
        <div class="product-actions">
          <button
            class="product-actions__add-to-cart"
            type="button"
            (click)="addToCart()"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  `,
  imports: [CurrencyPipe, NgStyle, PlayButtonComponent],
})
export class ProductTileComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _audioPlayer = inject(AudioPlayerService);
  private readonly _cartService = inject(CartService);

  readonly product = input.required<ProductListItem>();

  readonly isPlaying = computed(
    () =>
      this._audioPlayer.isPlaying() &&
      this._audioPlayer.playlist()?.productId === this.product().id,
  );

  get imageUrl(): string {
    return this.product().images[0] ?? 'assets/images/fallback-artwork.jpg';
  }

  get altText(): string {
    return `${this.product().title} artwork`;
  }

  get price(): string {
    return this.product().price.amount;
  }

  get currencyCode(): string {
    return this.product().price.currencyCode;
  }

  get hasTrackPreview(): boolean {
    return this.product().trackList.some((track) => track.previewUrl);
  }

  ngOnInit() {
    console.log('Product', this.product());
  }

  openDetailView(): void {
    this._router.navigate(['release', this.product().id]);
  }

  togglePlayPause(event: Event): void {
    event.stopPropagation();

    if (
      !this._audioPlayer.playlist() ||
      this._audioPlayer.playlist()?.productId !== this.product().id
    ) {
      this._audioPlayer.loadPlaylist(
        this.product().id,
        this.product().trackList,
        this.product().images[0],
        this.product().price,
        0,
      );
    } else if (this._audioPlayer.isPlaying()) {
      this._audioPlayer.pause();
    } else {
      this._audioPlayer.play();
    }
  }

  addToCart(): void {
    this._cartService.addItem(this.product(), 1);
  }
}
