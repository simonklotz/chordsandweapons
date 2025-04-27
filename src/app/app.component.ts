import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/ui-common/layout/header.component';
import { MainComponent } from './shared/ui-common/layout/main.component';
import { FooterComponent } from './shared/ui-common/layout/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MainComponent, FooterComponent],
  template: `
    <div class="page-container">
      <app-header class="app-header"></app-header>
      <app-main class="app-main"></app-main>
      <app-footer class="app-footer"></app-footer>
    </div>
  `,
})
export class AppComponent {}
