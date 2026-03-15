import {
  Component,
  DestroyRef,
  inject,
  linkedSignal,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { merge, Observable, of } from 'rxjs';
import { ProductTileComponent } from '../../../shared/components/product-tile.component';
import { TickerComponent } from '../../../shared/components/ticker.component';
import { QueryParams } from '../../../core/models/query-params.interface';
import { ProductApiService } from '../product-api.service';
import { ProductListResponse } from './models/product-list-response.interface';
import { ProductListItem } from './models/product-list-item.interface';
import { PageInfo } from './models/page-info.interface';
import { RouteData } from './models/route-data.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SearchService } from '../../search/search.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductTileComponent, TickerComponent],
  template: `
    <div class="product-list">
      <app-ticker class="product-list__ticker" [text]="tickerText()" [speed]="150"></app-ticker>

      <div class="product-list__wrapper">
        @for (product of products(); track product) {
          <app-product-tile [product]="product" class="app-product-tile"></app-product-tile>
        }
      </div>

      @if (pageInfo().hasNextPage) {
        <div class="product-list__load-more">
          <button class="product-list__load-more-button" type="button" (click)="onLoadMore()">
            Load More
          </button>
        </div>
      }
    </div>
  `,
})
export class ProductListComponent implements OnInit, OnDestroy {
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _apiService = inject(ProductApiService);
  private readonly _searchService = inject(SearchService);

  query = this._searchService.query;
  tickerText = linkedSignal(() => this.query() ?? this.title);
  products = signal<ProductListItem[]>([]);
  pageInfo = signal<PageInfo>({
    limit: 0,
    hasNextPage: false,
  });

  get routeSnapshotData(): RouteData {
    return this._activatedRoute.snapshot.data as RouteData;
  }

  get title(): string {
    return this.routeSnapshotData.title;
  }

  get filter(): string | undefined {
    return this.routeSnapshotData.filter;
  }

  get isSearch(): boolean | undefined {
    return this.routeSnapshotData.isSearch;
  }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params) => {
      const query = params['q'] as string | undefined;

      if (query) {
        this._searchService.query$.next(query);
      } else {
        this._searchService.query$.next(void 0);
      }
    });

    merge(this._searchService.searchResult$, this.fetchProducts())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((result) => {
        this.products.set(result.products);
        this.pageInfo.set({
          ...result,
        });
      });
  }

  ngOnDestroy(): void {
    this.products.set([]);
    this.pageInfo.set({
      limit: 0,
      hasNextPage: false,
    });
    this._searchService.query$.next(void 0);
  }

  onLoadMore(): void {
    let loadProducts$: Observable<ProductListResponse>;

    if (this.isSearch) {
      loadProducts$ = this._searchService.loadMore(
        this.query() as string,
        this.pageInfo().endCursor as string,
      );
    } else {
      loadProducts$ = this.fetchProducts();
    }

    loadProducts$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((result) => {
      this.products.set([...this.products(), ...result.products]);
      this.pageInfo.set({
        ...result,
      });
    });
  }

  private fetchProducts(): Observable<ProductListResponse> {
    const params: QueryParams = {};

    if (this.pageInfo().endCursor) {
      params['after'] = this.pageInfo().endCursor as string;
    }

    switch (this.filter) {
      case 'latest':
        return this._apiService.fetchProducts(params);
      case 'techno':
      case 'house':
      case 'trance':
      case 'electro':
      case 'breaks':
        return this._apiService.fetchProducts({ ...params, genre: this.filter });
      default:
        return of({
          products: [],
          limit: 0,
          hasNextPage: false,
        });
    }
  }
}
