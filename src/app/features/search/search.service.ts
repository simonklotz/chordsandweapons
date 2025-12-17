import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { ProductApiService } from '../../core/services/product-api.service';
import { DialogService } from '../../shared/dialog/dialog.service';
import { SearchComponent } from './search.component';
import { filterValidQueries } from './helpers/filter-valid-queries.helper';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly _dialog = inject(DialogService);
  private readonly _router = inject(Router);
  private readonly _apiService = inject(ProductApiService);

  private _query$ = new BehaviorSubject<string | undefined>(void 0);
  query$ = this._query$;

  searchResult$ = this.query$.pipe(
    filterValidQueries(),
    switchMap((query) => {
      return this._apiService.searchProducts(query);
    }),
    tap(() => this._query$.next(void 0)),
  );

  openSearchDialog(): void {
    this._dialog
      .open<string, SearchComponent>(SearchComponent)
      .closed.subscribe((searchQuery) => {
        if (searchQuery) {
          this._query$.next(searchQuery);
          this._router.navigate(['search']);
        }
      });
  }
}
