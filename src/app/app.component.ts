import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/layout/header.component';
import { MainComponent } from './shared/layout/main.component';
import { FooterComponent } from './shared/layout/footer.component';
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

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
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const client = createStorefrontApiClient({
      storeDomain: 'http://jm0g9p-7n.myshopify.com',
      apiVersion: '2025-04',
      publicAccessToken: '39cfa45b34ebf7e60edfa593fe37d2e7',
    });
  }
}
