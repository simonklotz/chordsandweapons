import { Component, input, signal } from '@angular/core';
import { NavMenu } from './nav-menu.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [RouterLink],
  template: `
    <button (click)="toggle()">{{ navMenu().name }}</button>
    @if (isOpen()) {
      <ul class="nav-menu__item-list">
        @for (item of navMenu().navItems; track item) {
          <li class="nav-item">
            <a [routerLink]="item.route">{{ item.name }}</a>
          </li>
        }
      </ul>
    }
  `,
})
export class NavMenuComponent {
  readonly navMenu = input<NavMenu>({ name: '', navItems: [] });
  readonly isOpen = signal(false);

  toggle(): void {
    this.isOpen.update((o) => !o);
  }
}
