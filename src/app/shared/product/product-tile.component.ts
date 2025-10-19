import { Component, inject, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from './product.interface';
import { Router } from '@angular/router';

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
      />
      <div class="product-info">
        <h3 class="product-info__title">
          {{ product()?.title }}
        </h3>
        <h4 class="product-info__artist">{{ product()?.artist }}</h4>
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

  private readonly _router = inject(Router);

  openDetailView(): void {
    this._router.navigate(['release', this.product()?.id]);
  }
}
