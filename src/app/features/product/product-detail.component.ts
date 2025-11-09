import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/models/product.interface';
import { CurrencyPipe } from '@angular/common';
import { QuantityInputComponent } from '../../shared/forms/quantity-input.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { AudioPlayerService } from '../../core/services/audio-player.service';
import { Track } from '../../core/models/track.interface';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  template: `
    <div class="product-detail-wrapper">
      <div class="grid-item product-artwork">
        <img
          class="product-artwork__img"
          [src]="product.imageUrl"
          [alt]="altText"
        />
      </div>
      <div class="grid-item product-info">
        <div class="product-info-item product-heading">
          <h2>{{ product.artist }} - {{ product.title }}</h2>
        </div>
        <div class="product-info-item product-price">
          <strong>{{ price | currency: currencyCode }}</strong>
        </div>
        <form
          class="product-info-item add-to-cart-form"
          [formGroup]="addToCartForm"
          (ngSubmit)="addToCart()"
          role="form"
          aria-label="Add to cart"
        >
          <app-quantity-input
            class="add-to-cart-form__quantity"
            formControlName="quantity"
            [decrease]="decreaseQuantity"
            [increase]="increaseQuantity"
          ></app-quantity-input>
          <button class="button add-to-cart-form__submit" type="submit">
            Add to cart
          </button>
        </form>
        <div class="product-info-item product-track-list">
          @for (
            track of product.trackList;
            track track.position;
            let idx = $index
          ) {
            <div
              [id]="'track-' + idx"
              tabindex="0"
              class="playlist-track"
              (click)="playTrack(idx, track)"
              (keydown.enter)="playTrack(idx, track)"
              (keydown.space)="playTrack(idx, track)"
            >
              <div class="playlist-track-button">
                <img
                  [id]="'icon-' + idx"
                  [src]="trackIcon()"
                  alt="search submit"
                  width="24"
                  height="24"
                />
              </div>
              <div class="playlist-track-title">{{ track.title }}</div>
            </div>
          }
        </div>
        <div class="product-info-item product-description">
          <p>{{ product.description }}</p>
        </div>
      </div>
    </div>
  `,
  imports: [CurrencyPipe, QuantityInputComponent, ReactiveFormsModule],
})
export class ProductDetailComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _audioPlayer = inject(AudioPlayerService);

  decreaseQuantity = new Subject<void>();
  increaseQuantity = new Subject<void>();

  addToCartForm = new FormGroup({
    quantity: new FormControl(1),
  });

  get product(): Product {
    return this._activatedRoute.snapshot.data['product'] as Product;
  }

  get altText(): string {
    return `${this.product.title} artwork`;
  }

  get price(): string {
    return this.product.price.amount;
  }

  get currencyCode(): string {
    return this.product.price.currencyCode;
  }

  ngOnInit() {
    this._audioPlayer.loadPlaylist(this.product.trackList);
  }

  @HostListener('window:keydown.-')
  handleMinusEvent() {
    this.decreaseQuantity.next();
  }

  @HostListener('window:keydown.+')
  handlePlusEvent() {
    this.increaseQuantity.next();
  }

  addToCart(): void {
    console.log('AddToCart');
  }

  playIcon = 'icons/play_arrow_24dp_black.svg';
  pauseIcon = 'icons/pause_24dp_black.svg';

  trackIcon = signal(this.playIcon);

  playTrack(id: number, track: Track): void {
    this._audioPlayer.play(track);

    this.getPlayingElement(id)?.setAttribute('src', this.pauseIcon)
  }

  getPlayingElement(index: number): HTMLElement | null {
    return document.getElementById(`icon-${index}`);
  }
}
