import { inject, Injectable, Type } from '@angular/core';
import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { Overlay } from '@angular/cdk/overlay';

@Injectable({ providedIn: 'root' })
export class DialogService {
  private _dialog = inject(Dialog);
  private _overlay = inject(Overlay);

  open<R = unknown, C = unknown, D = unknown>(
    component: Type<C>,
  ): DialogRef<R, C> {
    const config: DialogConfig<D, DialogRef<R, C>> = {
      hasBackdrop: true,
      disableClose: false,
      backdropClass: 'app-backdrop',
      panelClass: 'app-dialog-panel',
      width: '100%',
      positionStrategy: this._overlay
        .position()
        .global()
        .top('54px')
        .centerHorizontally(),
      scrollStrategy: this._overlay.scrollStrategies.block(),
    };
    return this._dialog.open<R, D, C>(component, config);
  }
}
