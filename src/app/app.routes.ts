import { Routes } from '@angular/router';
import { ProductListComponent } from './features/product/product-list/product-list.component';
import { ContactComponent } from './layout/pages/contact.component';
import { ImpressumComponent } from './layout/pages/impressum.component';
import { productResolver } from './features/product/product-detail/product.resolver';

export const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    data: { title: 'Latest', filter: 'latest' },
  },
  {
    path: 'genre/techno',
    component: ProductListComponent,
    data: { title: 'Techno', filter: 'techno' },
  },
  {
    path: 'genre/house',
    component: ProductListComponent,
    data: { title: 'House', filter: 'house' },
  },
  {
    path: 'genre/trance',
    component: ProductListComponent,
    data: { title: 'Trance', filter: 'trance' },
  },
  {
    path: 'genre/electro',
    component: ProductListComponent,
    data: { title: 'Electro', filter: 'electro' },
  },
  {
    path: 'genre/breaks',
    component: ProductListComponent,
    data: { title: 'Breaks', filter: 'breaks' },
  },
  {
    path: 'search',
    component: ProductListComponent,
    data: { title: 'Search result', isSearch: true },
  },
  {
    path: 'release/:id',
    loadComponent: () =>
      import('./features/product/product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent,
      ),
    resolve: {
      product: productResolver,
    },
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'impressum',
    component: ImpressumComponent,
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./features/checkout/checkout.component').then((m) => m.CheckoutComponent),
  },
];
