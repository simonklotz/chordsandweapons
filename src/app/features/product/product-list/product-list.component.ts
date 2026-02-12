import { Component, inject, OnInit, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { merge, Observable, of } from 'rxjs';
import { ProductTileComponent } from '../../../shared/components/product-tile.component';
import { TickerComponent } from '../../../shared/components/ticker.component';
import { filterValidQueries } from '../../search/helpers/filter-valid-queries.helper';
import { SearchService } from '../../search/search.service';
import { ProductListItem } from './models/product-list-item.interface';
import { ProductListResponse } from './models/product-list-response.interface';
import { PageInfo } from './models/page-info.interface';
import { RouteData } from './models/route-data.interface';
import { ProductApiService } from '../product-api.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductTileComponent, AsyncPipe, TickerComponent],
  template: `
    <div class="product-list">
      <app-ticker
        class="product-list__ticker"
        [text]="'CHORDSANDWEAPONS'"
        [speed]="150"
      ></app-ticker>

      <div class="product-list__header">
        @if (title === 'Search result') {
          <h1 class="h1">{{ title }}: {{ query$ | async }}</h1>
        } @else {
          <h1 class="h1">{{ title }}</h1>
        }
      </div>

      <div class="product-list__wrapper">
        @for (product of products(); track product) {
          <app-product-tile [product]="product" class="app-product-tile"></app-product-tile>
        }
      </div>
    </div>
  `,
})
export class ProductListComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _apiService = inject(ProductApiService);
  private readonly _searchService = inject(SearchService);

  query$ = this._searchService.query$.pipe(filterValidQueries());
  products = signal<ProductListItem[]>([]);
  pageInfo = signal<PageInfo>({
    total: 0,
    page: 0,
    limit: 0,
    hasNextPage: false,
  });

  get routeSnapshotData(): RouteData {
    return this._activatedRoute.snapshot.data as RouteData;
  }

  get title(): string {
    return this.routeSnapshotData.title;
  }

  get filter(): string {
    return this.routeSnapshotData.filter;
  }

  ngOnInit(): void {
    merge(this._searchService.searchResult$, this.fetchProducts()).subscribe((result) => {
      console.log('Fetched products:', result);
      this.products.set(result.products);
      this.pageInfo.set({
        ...result,
      });
    });
  }

  private fetchProducts(): Observable<ProductListResponse> {
    switch (this.filter) {
      case 'latest':
        return this._apiService.fetchProducts(8);
      case 'techno':
        return this._apiService.fetchProductsByGenre('techno', 8);
      case 'house':
        return this._apiService.fetchProductsByGenre('house', 8);
      case 'trance':
        return this._apiService.fetchProductsByGenre('trance', 8);
      case 'electro':
        return this._apiService.fetchProductsByGenre('electro', 8);
      case 'breaks':
        return this._apiService.fetchProductsByGenre('breaks', 8);
      default:
        return of({
          products: [],
          total: 0,
          page: 0,
          limit: 0,
          hasNextPage: false,
        });
    }
  }
}
