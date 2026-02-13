import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { ProductApiService } from '../product/product-api.service';
import { DialogService } from '../../shared/dialog/dialog.service';
import { SearchComponent } from './search.component';
import { filterValidQueries } from './helpers/filter-valid-queries.helper';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductListResponse } from '../product/product-list/models/product-list-response.interface';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly _dialog = inject(DialogService);
  private readonly _router = inject(Router);
  private readonly _apiService = inject(ProductApiService);

  query$ = new BehaviorSubject<string | undefined>(void 0);
  query = toSignal(this.query$);

  searchResult$ = this.query$.pipe(
    filterValidQueries(),
    switchMap((query) => {
      return this._apiService.searchProducts({ q: query });
    }),
  );

  loadMore(query: string, after: string): Observable<ProductListResponse> {
    return this._apiService.searchProducts({ q: query, after });
  }

  openSearchDialog(): void {
    this._dialog.open<string, SearchComponent>(SearchComponent).closed.subscribe((searchQuery) => {
      if (searchQuery) {
        this._router.navigate(['search'], {
          queryParams: { q: searchQuery },
        });
      }
    });
  }
}
