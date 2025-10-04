import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { ProductResponse } from '../../core/product-response.interface';
import { ProductTileComponent } from '../../shared/product/product-tile.component';
import { RouteData } from './route-data.interface';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [ProductTileComponent],
  template: `
    <div class="search-result">
      <h1 class="search-result__title h1">{{ title }}</h1>
      <div class="search-result__wrapper">
        @for (product of products().products; track product) {
          <app-product-tile
            [product]="product"
            class="product-tile"
          ></app-product-tile>
        }
      </div>
    </div>
  `,
})
export class SearchResultComponent {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _apiService = inject(ApiService);

  products: Signal<ProductResponse>;

  constructor() {
    this.products = toSignal(this._apiService.getProducts(), {
      initialValue: {
        products: [],
        pageInfo: { hasNextPage: false, endCursor: null },
      },
    });
  }

  get routeSnapshotData(): RouteData {
    return this._activatedRoute.snapshot.data as RouteData;
  }

  get title(): string {
    return this.routeSnapshotData.title;
  }
}
