import { inject, Injectable } from '@angular/core';
import { DialogService } from '../../shared/dialog/dialog.service';
import { SearchComponent } from './search.component';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly _dialog = inject(DialogService);

  onSearch(): void {
    this._dialog.open(SearchComponent).closed.subscribe((dialogResult) => {
      console.log('dialogResult', dialogResult);
    });
  }
}
