import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavMenuComponent } from './nav-menu.component';
import { NavMenu } from './nav-menu.interface';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, NavMenuComponent],
  template: `
    <nav class="nav-bar">
      <ul>
        <li class="nav-item"><a routerLink="/">Logo</a></li>
        <li class="nav-item">
          <app-nav-menu [navMenu]="genreMenu"></app-nav-menu>
        </li>
        <li class="nav-item">Search...</li>
        <li class="nav-item">
          <app-nav-menu [navMenu]="moreMenu"></app-nav-menu>
        </li>
        <li class="nav-item"><a routerLink="/cart">Cart</a></li>
      </ul>
    </nav>
  `,
})
export class NavBarComponent {
  genreMenu: NavMenu = {
    name: 'Genre ▼',
    navItems: [
      {
        name: 'Techno',
        route: '/genre/techno',
      },
      {
        name: 'House',
        route: '/genre/house',
      },
      {
        name: 'Electro',
        route: '/genre/electro',
      },
      {
        name: 'Breaks',
        route: '/genre/breaks',
      },
    ],
  };
  moreMenu: NavMenu = {
    name: 'More ▼',
    navItems: [],
  };
}
