import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { DialogService } from '../../shared/dialog/dialog.service';
import { SearchComponent } from './search.component';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly _dialog = inject(DialogService);
  private readonly _router = inject(Router);

  query: WritableSignal<string | undefined> = signal(void 0);

  onSearch(): void {
    this._dialog
      .open<string, SearchComponent>(SearchComponent)
      .closed.subscribe((searchQuery) => {
        if (searchQuery) {
          this.query.set(searchQuery);
          this.triggerSearch();
          this._router.navigate(['search']);
        }
      });
  }

  // TODO return actual search result
  private triggerSearch(): Observable<string> {
    return of('');
  }
}
