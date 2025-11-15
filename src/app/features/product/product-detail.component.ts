import { Component, HostListener, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/models/product.interface';
import { CurrencyPipe } from '@angular/common';
import { QuantityInputComponent } from '../../shared/forms/quantity-input.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { Track } from '../../core/models/track.interface';
import { AudioPlayerService } from '../audio-player/audio-player.service';

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
      <div class="grid-item product-heading">
        <h2>{{ product.artist }} - {{ product.title }}</h2>
      </div>
      <div class="grid-item product-price">
        <strong>{{ price | currency: currencyCode }}</strong>
      </div>
      <div class="grid-item product-add-to-cart">
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
      <div class="grid-item product-description">
        <p>{{ product.description }}</p>
      </div>
    </div>
  `,
  imports: [CurrencyPipe, QuantityInputComponent, ReactiveFormsModule],
})
export class ProductDetailComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _audioPlayerService = inject(AudioPlayerService);

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

  ngOnInit(): void {
    console.log('Product', this.product);
  }

  addToCart(): void {
    console.log('AddToCart');
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
        this.product.imageUrl,
        this.product.price,
        track.position - 1,
      );
    } else {
      this._audioPlayerService.playTrack(track.position - 1);
    }
  }
}
