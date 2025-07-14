import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-header',
  template: `
    <header class="header">
      <ng-content></ng-content>
    </header>
  `,
})
export class HeaderComponent {}
