import { Component, inject } from '@angular/core';
import { SearchService } from '../../features/search/search.service';
import { CartService } from '../../features/cart/cart.service';
import { RouterLink } from '@angular/router';
import { NavItem } from './nav-item.interface';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="nav-menu-wrapper">
      <nav class="nav" aria-label="Main Navigation">
        <div class="nav__top">
          <div class="nav__item nav__logo">
            <a class="nav__link" routerLink="/">
              <img class="logo-img" src="assets/images/logo.jpg" alt="Logo" />
            </a>
          </div>
          <div class="nav__icon-menu">
            <div
              class="nav__item"
              tabindex="0"
              (click)="onSearch()"
              (keydown.enter)="onSearch()"
              (keydown.space)="onSearch()"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="nav-icon">
                <path
                  d="M792-120.67 532.67-380q-30 25.33-69.64 39.67Q423.39-326 378.67-326q-108.44 0-183.56-75.17Q120-476.33 120-583.33t75.17-182.17q75.16-75.17 182.5-75.17 107.33 0 182.16 75.17 74.84 75.17 74.84 182.27 0 43.23-14 82.9-14 39.66-40.67 73l260 258.66-48 48Zm-414-272q79.17 0 134.58-55.83Q568-504.33 568-583.33q0-79-55.42-134.84Q457.17-774 378-774q-79.72 0-135.53 55.83-55.8 55.84-55.8 134.84t55.8 134.83q55.81 55.83 135.53 55.83Z"
                />
              </svg>
            </div>
            <div
              class="nav__item nav__cart"
              tabindex="0"
              (click)="onCart()"
              (keydown.enter)="onCart()"
              (keydown.space)="onCart()"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="nav-icon">
                <path
                  d="M284.53-80.67q-30.86 0-52.7-21.97Q210-124.62 210-155.47q0-30.86 21.98-52.7Q253.95-230 284.81-230t52.69 21.98q21.83 21.97 21.83 52.83t-21.97 52.69q-21.98 21.83-52.83 21.83Zm400 0q-30.86 0-52.7-21.97Q610-124.62 610-155.47q0-30.86 21.98-52.7Q653.95-230 684.81-230t52.69 21.98q21.83 21.97 21.83 52.83t-21.97 52.69q-21.98 21.83-52.83 21.83ZM238.67-734 344-515.33h285.33l120-218.67H238.67ZM206-800.67h589.38q22.98 0 34.97 20.84 11.98 20.83.32 41.83L693.33-490.67q-11 19.34-28.87 30.67-17.87 11.33-39.13 11.33H324l-52 96h487.33V-286H278q-43 0-63-31.83-20-31.84-.33-68.17l60.66-111.33-149.33-316H47.33V-880h121.34L206-800.67Zm138 285.34h285.33H344Z"
                />
              </svg>
              @if (cartItemCount > 0) {
                <span class="cart-count-indicator">{{ cartItemCount }}</span>
              }
            </div>
          </div>
        </div>
        <div class="nav__bottom">
          <div class="nav__menu">
            @for (genre of genreList; track genre) {
              <div class="nav__item nav__menu-item">
                <a class="nav__link" [routerLink]="genre.route">{{ genre.label }}</a>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  `,
})
export class NavBarComponent {
  private readonly _searchService = inject(SearchService);
  private readonly _cartService = inject(CartService);

  genreList: NavItem[] = [
    {
      label: 'Techno',
      route: '/genre/techno',
    },
    {
      label: 'House',
      route: '/genre/house',
    },
    {
      label: 'Trance',
      route: '/genre/trance',
    },
    {
      label: 'Electro',
      route: '/genre/electro',
    },
    {
      label: 'Breaks',
      route: '/genre/breaks',
    },
  ];

  get cartItemCount(): number {
    return this._cartService.itemCount();
  }

  onSearch(): void {
    this._searchService.openSearchDialog();
  }

  onCart(): void {
    this._cartService.openPanel();
  }
}
