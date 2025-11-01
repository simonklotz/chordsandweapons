import { Component, inject, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductListItem } from '../../core/models/product-list-item.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-tile',
  standalone: true,
  template: `
    <div class="product-tile__wrapper">
      <img
        tabindex="0"
        class="product-image"
        [src]="imageUrl"
        [alt]="altText"
        width="100%"
        (click)="openDetailView()"
        (keydown.enter)="openDetailView()"
        (keydown.space)="openDetailView()"
      />
      <div class="product-info">
        <h3 class="product-info__title">
          {{ product().title }}
        </h3>
        <h4 class="product-info__artist">{{ product().artist }}</h4>
        <div>
          <span>{{ price | currency: currencyCode : true }}</span>
        </div>
      </div>
    </div>
  `,
  imports: [CurrencyPipe],
})
export class ProductTileComponent implements OnInit {
  readonly product = input.required<ProductListItem>();

  private readonly _router = inject(Router);

  get imageUrl(): string {
    return this.product().imageUrl ?? 'images/fallback-artwork.jpg';
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

  ngOnInit() {
    console.log('Product', this.product());
    console.log('Price', this.product().price);
  }

  openDetailView(): void {
    this._router.navigate(['release', this.product().id]);
  }
}
