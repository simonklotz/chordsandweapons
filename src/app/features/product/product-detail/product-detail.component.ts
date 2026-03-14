import { Component, HostListener, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { Product } from './models/product.interface';
import { Track } from '../../audio-player/models/track.interface';
import { CartService } from '../../cart/cart.service';
import { Artwork } from './models/artwork.interface';
import { QuantityInputComponent } from '../../../shared/components/quantity-input.component';
import { AudioPlayerService } from '../../audio-player/audio-player.service';
import { numberToCurrency } from '../../../shared/helpers/number-to-currency';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  template: `
    <div class="product-detail-wrapper">
      <div class="product-detail-grid">
        <div class="product-artwork">
          <img class="product-artwork__img" [src]="artwork().url" [alt]="artwork().altText" />
          <div class="product-artwork__selection">
            @for (image of product.images; track image; let i = $index) {
              <img
                tabindex="0"
                class="product-artwork__img-select"
                [src]="image"
                [alt]="altText + '-' + i"
                (click)="loadArtwork(image, i)"
                (keydown.enter)="loadArtwork(image, i)"
                (keydown.space)="loadArtwork(image, i)"
              />
            }
          </div>
        </div>
        <div class="product-info">
          <div class="product-info__heading">
            <h1 class="h1">
              {{ product.title }}
            </h1>
          </div>

          <div class="product-info__price">
            <strong>{{ price }}</strong>
          </div>

          <div class="product-info__inventory-status">
            @switch (product.inventoryStatus) {
              @case ('in_stock') {
                <span class="inventory-status in-stock">In stock</span>
              }
              @case ('low_stock') {
                <span class="inventory-status low-stock">Low stock</span>
              }
            }
          </div>

          <div class="product-info__add-to-cart">
            <form
              class="add-to-cart-form"
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
              <button
                class="button add-to-cart-form__submit"
                type="submit"
                [disabled]="isOutOfStock"
              >
                {{ isOutOfStock ? 'SOLD OUT' : 'ADD TO CART' }}
              </button>
            </form>
          </div>

          <div class="product-info__tracklist">
            <h4 class="h4 tracklist-heading">Tracklist:</h4>
            @if (product.trackList.length) {
              <ul class="ul tracklist-list">
                @for (track of product.trackList; track track.position) {
                  <li
                    [attr.tabindex]="track.previewUrl ? 0 : null"
                    class="li tracklist-list__item"
                    [class.tracklist-list__item--playable]="!!track.previewUrl"
                    [class.tracklist-list__item--active]="isActiveTrack(track.position)"
                    (click)="playTrack(track)"
                    (keydown.enter)="playTrack(track)"
                    (keydown.space)="playTrack(track)"
                  >
                    {{ track.title }}
                  </li>
                }
              </ul>
            } @else {
              -- No tracks available --
            }
          </div>

          <div class="product-info__release-details">
            <div class="product-info__item"><strong>Artist:</strong> {{ product.artist }}</div>
            <div class="product-info__item"><strong>Format:</strong> {{ product.format }}</div>
            <div class="product-info__item"><strong>Label:</strong> {{ product.label }}</div>
            <div class="product-info__item"><strong>Catalog:</strong> {{ product.catalog }}</div>
            <div class="product-info__item"><strong>Genre:</strong> {{ getGenre() }}</div>
          </div>

          <div class="product-info__description">
            <p class="p">{{ product.description }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [QuantityInputComponent, ReactiveFormsModule],
})
export class ProductDetailComponent {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _audioPlayerService = inject(AudioPlayerService);
  private readonly _cartService = inject(CartService);

  artwork = signal<Artwork>({
    url: this.product.images[0],
    altText: this.altText,
  });

  decreaseQuantity = new Subject<void>();
  increaseQuantity = new Subject<void>();

  addToCartForm = new FormGroup({
    quantity: new FormControl({
      value: this.isOutOfStock ? 0 : 1,
      disabled: this.isOutOfStock,
    }),
  });

  get product(): Product {
    return this._activatedRoute.snapshot.data['product'] as Product;
  }

  get altText(): string {
    return `${this.product.title} artwork`;
  }

  get price(): string {
    return numberToCurrency(Number(this.product.price.amount));
  }

  get currencyCode(): string {
    return this.product.price.currencyCode;
  }

  get isOutOfStock(): boolean {
    return this.product.inventoryStatus === 'out_of_stock';
  }

  loadArtwork(url: string, i: number): void {
    this.artwork.set({ url, altText: `${this.altText}-${i}` });
  }

  getGenre(): string {
    return this.product.genre.toString().replaceAll(',', ', ');
  }

  addToCart(): void {
    const quantity = this.addToCartForm.value.quantity ?? 0;
    if (quantity > 0) {
      this._cartService.addItem(this.product, quantity);
    }
  }

  @HostListener('window:keydown.-')
  handleMinusEvent(): void {
    if (this.isOutOfStock) {
      return;
    }
    this.decreaseQuantity.next();
  }

  @HostListener('window:keydown.+')
  handlePlusEvent(): void {
    if (this.isOutOfStock) {
      return;
    }
    this.increaseQuantity.next();
  }

  isActiveTrack(position: number): boolean {
    const playlist = this._audioPlayerService.playlist();
    if (!playlist || playlist.productId !== this.product.id) {
      return false;
    }
    const currentTrack = this._audioPlayerService.currentTrack();
    return currentTrack?.position === position;
  }

  playTrack(track: Track): void {
    if (!track.previewUrl) {
      return;
    }
    if (
      !this._audioPlayerService.playlist() ||
      this._audioPlayerService.playlist()?.productId !== this.product.id
    ) {
      this._audioPlayerService.loadPlaylist(
        this.product.id,
        this.product.trackList,
        this.product.images[0],
        this.product.price,
        track.position,
      );
    } else {
      this._audioPlayerService.playTrack(track.position);
    }
  }
}
