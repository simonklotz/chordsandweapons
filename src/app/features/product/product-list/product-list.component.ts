import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductApiService } from '../product-api.service';
import { ProductTileComponent } from '../../../shared/product/product-tile.component';
import { RouteData } from './models/route-data.interface';
import { SearchService } from '../../search/search.service';
import { merge, Observable, of } from 'rxjs';
import { ProductListItem } from './models/product-list-item.interface';
import { PageInfo } from './models/page-info.interface';
import { ProductListResponse } from './models/product-list-response.interface';
import { filterValidQueries } from '../../search/helpers/filter-valid-queries.helper';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductTileComponent, AsyncPipe],
  template: `
    <div class="product-list">
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
      this.products.set(result.products);
      this.pageInfo.set({
        ...result,
      });
    });
  }

  private fetchProducts(): Observable<ProductListResponse> {
    switch (this.filter) {
      case 'latest':
        return this._apiService.fetchProducts();
      case 'techno':
      case 'house':
      case 'electro':
      case 'breaks':
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
