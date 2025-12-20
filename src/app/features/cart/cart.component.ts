import {
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from './cart.service';
import { CartItem } from './models/cart-item.interface';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (cartService.isPanelOpen()) {
      <div
        tabindex="0"
        class="cart-panel-backdrop"
        (click)="onBackdropClick($event)"
        (keydown.enter)="onBackdropClick($event)"
        (keydown.space)="onBackdropClick($event)"
      >
        <aside
          class="cart-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Shopping cart"
          (click)="$event.stopPropagation()"
        >
          <div class="cart-panel__header">
            <h2 class="cart-panel__title">Your Cart</h2>
            <button
              class="cart-panel__close"
              (click)="closePanel()"
              aria-label="Close cart"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            </button>
          </div>

          <div class="cart-panel__content">
            @if (cartService.items().length === 0) {
              <p class="cart-panel__empty">Your cart is empty</p>
            } @else {
              <ul class="cart-panel__items">
                @for (item of cartService.items(); track item.product.id) {
                  <li class="cart-item">
                    <img
                      [src]="item.product.images[0]"
                      [alt]="item.product.title"
                      class="cart-item__image"
                    />
                    <div class="cart-item__details">
                      <h3 class="cart-item__title">{{ item.product.title }}</h3>
                      <p class="cart-item__artist">{{ item.product.artist }}</p>
                      <div class="cart-item__price-info">
                        <span class="cart-item__quantity"
                          >Qty: {{ item.quantity }}</span
                        >
                        <span class="cart-item__price">
                          {{ formatPrice(item) }}
                        </span>
                      </div>
                    </div>
                    <button
                      class="cart-item__remove"
                      (click)="removeItem(item.product.id)"
                      aria-label="Remove item"
                      type="button"
                    >
                      ×
                    </button>
                  </li>
                }
              </ul>
            }
          </div>

          @if (cartService.items().length > 0) {
            <div class="cart-panel__footer">
              <div class="cart-panel__subtotal">
                <span class="cart-panel__subtotal-label">Subtotal:</span>
                <span class="cart-panel__subtotal-amount">
                  {{ formatSubtotal() }}
                </span>
              </div>
              <button
                class="cart-panel__checkout button"
                type="button"
                (click)="goToCheckout()"
              >
                Checkout
              </button>
            </div>
          }
        </aside>
      </div>
    }
  `,
})
export class CartComponent {
  private readonly elementRef = inject(ElementRef);
  private readonly router = inject(Router);

  readonly cartService = inject(CartService);

  constructor() {
    // Focus trap: when panel opens, focus the close button
    effect(() => {
      if (this.cartService.isPanelOpen()) {
        setTimeout(() => {
          const closeButton = this.elementRef.nativeElement.querySelector(
            '.cart-panel__close',
          ) as HTMLElement;
          closeButton?.focus();
        }, 100);
      }
    });
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.cartService.isPanelOpen()) {
      this.closePanel();
    }
  }

  onBackdropClick(event: Event): void {
    // Only close on backdrop click for desktop (>768px)
    if (window.innerWidth > 768) {
      this.closePanel();
    }
  }

  closePanel(): void {
    this.cartService.closePanel();
  }

  removeItem(productId: number): void {
    this.cartService.removeItem(productId);
  }

  formatPrice(item: CartItem): string {
    const price = parseFloat(item.product.price.amount);
    const total = price * item.quantity;
    return this.formatCurrency(total, item.product.price.currencyCode);
  }

  formatSubtotal(): string {
    return this.formatCurrency(
      this.cartService.subtotal(),
      this.cartService.currencyCode(),
    );
  }

  goToCheckout(): void {
    this.closePanel();
    this.router.navigate(['/checkout']);
  }

  private formatCurrency(amount: number, currencyCode: string): string {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  }
}
