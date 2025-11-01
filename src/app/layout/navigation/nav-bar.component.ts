import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavMenuComponent } from './nav-menu.component';
import { NavMenu } from './nav-menu.interface';
import { NgOptimizedImage } from '@angular/common';
import { genreMenuConfig } from './configs/genre-menu-config';
import { moreMenuConfig } from './configs/more-menu-config';
import { SearchService } from '../../features/search/search.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, NavMenuComponent, NgOptimizedImage],
  template: `
    <nav class="nav" aria-label="Main Navigation">
      <div class="nav__left">
        <div class="nav__item">
          <a class="nav__link" routerLink="/">LOGO</a>
        </div>
        <ul class="nav__list">
          <li class="nav__item">
            <app-nav-menu class="nav-menu" [navMenu]="genreMenu"></app-nav-menu>
          </li>
          <li class="nav__item">
            <app-nav-menu class="nav-menu" [navMenu]="moreMenu"></app-nav-menu>
          </li>
        </ul>
      </div>

      <div class="nav__right">
        <ul class="nav__list">
          <li
            class="nav__item"
            tabindex="0"
            (click)="onSearch()"
            (keydown.enter)="onSearch()"
            (keydown.space)="onSearch()"
          >
            <img
              class="nav__icon"
              ngSrc="icons/search_32dp.svg"
              alt="suche"
              i18n-title
              title="Suche"
              height="32"
              width="32"
            />
          </li>

          <li class="nav__item">
            <a class="nav__link" routerLink="/cart">
              <img
                ngSrc="icons/shopping_cart_32dp.svg"
                alt="Warenkorb"
                i18n-title
                title="Warenkorb"
                height="32"
                width="32"
              />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  `,
})
export class NavBarComponent {
  genreMenu: NavMenu = genreMenuConfig;
  moreMenu: NavMenu = moreMenuConfig;

  private readonly _searchService = inject(SearchService);

  onSearch(): void {
    this._searchService.onSearch();
  }
}
