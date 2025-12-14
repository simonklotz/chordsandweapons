import { Component, HostListener, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { Product } from '../../core/models/product.interface';
import { Track } from '../../core/models/track.interface';
import { CartService } from '../../core/services/cart.service';
import { Artwork } from '../../core/models/artwork.interface';
import { QuantityInputComponent } from '../../shared/forms/quantity-input.component';
import { AudioPlayerService } from '../audio-player/audio-player.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  template: `
    <div class="product-detail-wrapper">
      <div class="grid-item product-heading">
        <h2>{{ product.title }}</h2>
      </div>

      <div class="grid-item product-info">
        <p><strong>Artist:</strong> {{ product.artist }}</p>
        <p><strong>Format:</strong> {{ product.format }}</p>
        <p><strong>Label:</strong> {{ product.label }}</p>
      </div>

      <div class="grid-item product-artwork">
        <img
          class="product-artwork__img"
          [src]="artwork().url"
          [alt]="artwork().altText"
        />
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

      <div class="grid-item product-description">
        <p>{{ product.description }}</p>
      </div>

      <div class="product-actions">
        <div class="grid-item product-price">
          <strong>{{ price | currency: currencyCode }}</strong>
        </div>

        <div class="grid-item product-inventory-status">
          @switch (product.inventoryStatus) {
            @case ('in_stock') {
              <span class="inventory-status in-stock">In stock</span>
            }
            @case ('low_stock') {
              <span class="inventory-status low-stock">Low stock</span>
            }
            @case ('out_of_stock') {
              <span class="inventory-status out-of-stock">Out of stock</span>
            }
          }
        </div>

        <div class="grid-item product-add-to-cart">
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
            <button class="button add-to-cart-form__submit" type="submit">
              Add to cart
            </button>
          </form>
        </div>

        <div class="grid-item product-tracklist">
          <h3 class="product-tracklist__heading">Tracklist</h3>
          <ul class="product-tracklist__list">
            @for (track of product.trackList; track track.position) {
              <li
                tabindex="0"
                class="product-tracklist__list-item"
                (click)="playTrack(track)"
                (keydown.enter)="playTrack(track)"
                (keydown.space)="playTrack(track)"
              >
                {{ track.title }}
              </li>
            }
          </ul>
        </div>
      </div>
    </div>
  `,
  imports: [CurrencyPipe, QuantityInputComponent, ReactiveFormsModule],
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

  loadArtwork(url: string, i: number): void {
    this.artwork.set({ url, altText: `${this.altText}-${i}` });
  }

  addToCart(): void {
    const quantity = this.addToCartForm.value.quantity ?? 0;
    if (quantity > 0) {
      this._cartService.addItem(this.product, quantity);
    }
  }

  @HostListener('window:keydown.-')
  handleMinusEvent() {
    this.decreaseQuantity.next();
  }

  @HostListener('window:keydown.+')
  handlePlusEvent() {
    this.increaseQuantity.next();
  }

  playTrack(track: Track): void {
    if (
      !this._audioPlayerService.playlist() ||
      this._audioPlayerService.playlist()?.productId !== this.product.id
    ) {
      this._audioPlayerService.loadPlaylist(
        this.product.id,
        this.product.trackList,
        this.product.images[0],
        this.product.price,
        track.position - 1,
      );
    } else {
      this._audioPlayerService.playTrack(track.position - 1);
    }
  }
}
