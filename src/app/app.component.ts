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
    <app-header class="app-header"><h1 class="h1">Header</h1></app-header>
    <app-main class="app-main"><h1 class="h1">Main</h1></app-main>
    <app-footer class="app-footer"><h1 class="h1">Footer</h1></app-footer>
  `,
})
export class AppComponent {}
