import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header.component';
import { MainComponent } from './layout/main.component';
import { FooterComponent } from './layout/footer.component';
import { NavBarComponent } from './layout/navigation/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    NavBarComponent,
  ],
  template: `
    <app-header class="app-header">
      <app-nav-bar></app-nav-bar>
    </app-header>
    <app-main class="app-main">
      <router-outlet></router-outlet>
    </app-main>
    <app-footer class="app-footer"><h1 class="h1">Footer</h1></app-footer>
  `,
})
export class App {}
