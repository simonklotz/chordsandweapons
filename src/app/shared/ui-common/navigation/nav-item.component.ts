import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavItem } from './nav-item.interface';

@Component({
  standalone: true,
  selector: 'app-nav-item',
  template: `
    <div
      class="nav-item"
      (click)="onClick()"
      (keyup.enter)="onClick()"
      tabindex="0"
    ></div>
  `,
})
export class NavItemComponent {
  @Input({ required: true }) navItem: NavItem;
  @Output() clickedNavItem = new EventEmitter<NavItem>();

  onClick(): void {
    this.clickedNavItem.next(this.navItem);
  }
}
