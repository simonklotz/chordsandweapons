import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductApiService } from '../../core/services/product-api.service';
import { ProductTileComponent } from '../../shared/product/product-tile.component';
import { RouteData } from './models/route-data.interface';
import { SearchService } from './search.service';
import { ProductListResponse } from '../../core/models/product-list-response.interface';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [ProductTileComponent],
  template: `
    <div class="search-result">
      @if (title === 'Search result' && search.query()) {
        <h1 class="search-result__title h1">
          {{ title }}: {{ search.query() }}
        </h1>
      } @else {
        <h1 class="search-result__title h1">{{ title }}</h1>
      }
      <div class="search-result__wrapper">
        @for (product of products().products; track product) {
          <app-product-tile
            [product]="product"
            class="app-product-tile"
          ></app-product-tile>
        }
      </div>
    </div>
  `,
})
export class SearchResultComponent {
  readonly search = inject(SearchService);

  products: Signal<ProductListResponse>;

  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _apiService = inject(ProductApiService);

  constructor() {
    this.products = toSignal(this._apiService.getProducts(), {
      initialValue: {
        products: [],
        total: 0,
        page: 0,
        limit: 0,
        hasNextPage: false,
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
