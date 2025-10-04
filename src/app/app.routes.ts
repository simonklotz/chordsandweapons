import { Routes } from '@angular/router';
import { SearchResultComponent } from './features/search/search-result.component';
import { CartComponent } from './features/cart/cart.component';
import { ContactComponent } from './layout/pages/contact.component';
import { ImpressumComponent } from './layout/pages/impressum.component';

export const routes: Routes = [
  {
    path: '',
    component: SearchResultComponent,
    data: { title: $localize`Neueste` },
  },
  {
    path: 'genre/techno',
    component: SearchResultComponent,
    data: { title: 'Techno' },
  },
  {
    path: 'genre/house',
    component: SearchResultComponent,
    data: { title: 'House' },
  },
  {
    path: 'genre/electro',
    component: SearchResultComponent,
    data: { title: 'Electro' },
  },
  {
    path: 'genre/breaks',
    component: SearchResultComponent,
    data: { title: 'Breaks' },
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
    path: 'cart',
    component: CartComponent,
  },
];
