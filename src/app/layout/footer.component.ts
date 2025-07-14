import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <ng-content></ng-content>
    </footer>
  `,
})
export class FooterComponent {}
