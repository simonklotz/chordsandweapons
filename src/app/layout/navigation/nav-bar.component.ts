import { Component, inject } from '@angular/core';
import { CartService } from '../../features/cart/cart.service';
import { RouterLink } from '@angular/router';
import { NavItem } from './nav-item.interface';
import { SearchService } from '../../features/search/search.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
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
              class="nav__item button search-button"
              tabindex="0"
              (click)="onSearch()"
              (keydown.enter)="onSearch()"
              (keydown.space)="onSearch()"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="nav-icon">
                <path
                  d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
                />
              </svg>
            </div>
            <div
              class="nav__item button nav__cart"
              tabindex="0"
              (click)="onCart()"
              (keydown.enter)="onCart()"
              (keydown.space)="onCart()"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="nav-icon">
                <path
                  d="M200-80q-33 0-56.5-23.5T120-160v-480q0-33 23.5-56.5T200-720h80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720h80q33 0 56.5 23.5T840-640v480q0 33-23.5 56.5T760-80H200Zm0-80h560v-480H200v480Zm421.5-298.5Q680-517 680-600h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85h-80q0 83 58.5 141.5T480-400q83 0 141.5-58.5ZM360-720h240q0-50-35-85t-85-35q-50 0-85 35t-35 85ZM200-160v-480 480Z"
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
