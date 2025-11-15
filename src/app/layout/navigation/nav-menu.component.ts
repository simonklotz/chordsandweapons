import {
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';
import { NavMenu } from './nav-menu.interface';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  template: `
    <div
      tabindex="0"
      class="nav-menu__wrapper"
      (click)="toggle()"
      (keydown.enter)="toggle()"
      (keydown.space)="toggle()"
    >
      <span class="nav-menu__label nav__label">
        {{ navMenu().label }}
      </span>
      <span class="nav-menu__icon-wrapper">
        <img
          class="nav__icon"
          ngSrc="assets/icons/keyboard_arrow_down_32dp.svg"
          alt="menu open indicator"
          height="32"
          width="32"
        />
      </span>

      @if (isOpen()) {
        <div class="nav-menu__panel">
          <ul class="nav__list">
            @for (item of navMenu().navItems; track item) {
              <li>
                <a
                  class="nav__item nav__link nav__label"
                  [routerLink]="item.route"
                  >{{ item.label }}</a
                >
              </li>
            }
          </ul>
        </div>
      }
    </div>
  `,
})
export class NavMenuComponent {
  readonly navMenu = input<NavMenu>({ label: '', navItems: [] });
  readonly isOpen = signal(false);

  private readonly _el = inject(ElementRef<HTMLElement>);

  toggle(): void {
    this.isOpen.update((o) => !o);
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentMouseDown(event: MouseEvent): void {
    if (!this.isOpen()) {
      return;
    }

    const target = event.target as Node | null;
    if (target && !this._el.nativeElement.contains(target)) {
      this.toggle();
    }
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.isOpen()) {
      this.toggle();
    }
  }
}
