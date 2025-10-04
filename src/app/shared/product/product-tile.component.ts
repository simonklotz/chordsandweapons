import { Component, input } from '@angular/core';
import { Product } from './product.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-tile',
  standalone: true,
  template: `
    <div class="product-tile">
      <img [src]="imageUrl" [alt]="altText" width="100%" />
      <div class="product-info">
        <h3 class="product-info__title">
          {{ product()?.title }}
        </h3>
        <h3 class="product-info__artist">{{ product()?.artist }}</h3>
        <div>
          <span>{{ product()?.price | currency }}</span>
        </div>
      </div>
    </div>
  `,
  imports: [CurrencyPipe],
})
export class ProductTileComponent {
  readonly product = input<Product>();

  get imageUrl(): string {
    return this.product()?.imageUrl ?? 'images/fallback-artwork.jpg';
  }

  get altText(): string {
    return `${this.product()?.title} artwork`;
  }
}
