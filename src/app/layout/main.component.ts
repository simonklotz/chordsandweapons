import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-main',
  template: `
    <main class="main">
      <ng-content></ng-content>
    </main>
  `,
})
export class MainComponent {}
