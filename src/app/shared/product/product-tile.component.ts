import { Component, input } from '@angular/core';
import { Product } from './product.interface';

@Component({
  selector: 'app-product-tile',
  standalone: true,
  template: `
    <div class="product-tile">
      {{ product()?.title }}
    </div>
  `,
})
export class ProductTileComponent {
  readonly product = input<Product>();
}
