import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchService } from '../../features/search/search.service';
import { CartService } from '../../core/services/cart.service';
import { genreMenuConfig } from './configs/genre-menu-config';
import { moreMenuConfig } from './configs/more-menu-config';
import { NavMenuComponent } from './nav-menu.component';
import { NavMenu } from './nav-menu.interface';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, NavMenuComponent, NgOptimizedImage],
  template: `
    <nav class="nav" aria-label="Main Navigation">
      <ul class="nav__left nav__list">
        <li class="nav__item">
          <a class="nav__link" routerLink="/">LOGO</a>
        </li>
        <li class="nav__item">
          <app-nav-menu class="nav-menu" [navMenu]="genreMenu"></app-nav-menu>
        </li>
        <li class="nav__item">
          <app-nav-menu class="nav-menu" [navMenu]="moreMenu"></app-nav-menu>
        </li>
      </ul>

      <ul class="nav__right">
        <li
          class="nav__item"
          tabindex="0"
          (click)="onSearch()"
          (keydown.enter)="onSearch()"
          (keydown.space)="onSearch()"
        >
          <img
            class="nav__icon"
            ngSrc="assets/icons/search_32dp.svg"
            alt="suche"
            i18n-title
            title="Suche"
            height="32"
            width="32"
          />
        </li>
        <li
          class="nav__item nav__item--cart"
          tabindex="0"
          (click)="onCart()"
          (keydown.enter)="onCart()"
          (keydown.space)="onCart()"
        >
          <img
            ngSrc="assets/icons/shopping_cart_32dp.svg"
            alt="Warenkorb"
            i18n-title
            title="Warenkorb"
            height="32"
            width="32"
          />
          @if (cartItemCount > 0) {
            <span class="cart-count-indicator">{{ cartItemCount }}</span>
          }
        </li>
      </ul>
    </nav>
  `,
})
export class NavBarComponent {
  private readonly _searchService = inject(SearchService);
  private readonly _cartService = inject(CartService);

  genreMenu: NavMenu = genreMenuConfig;
  moreMenu: NavMenu = moreMenuConfig;

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
