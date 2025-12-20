import { computed, Injectable, signal } from '@angular/core';
import { CartItem } from './models/cart-item.interface';
import { Product } from '../product/product-detail/models/product.interface';
import { ProductListItem } from '../product/product-list/models/product-list-item.interface';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>([]);
  private readonly _isPanelOpen = signal<boolean>(false);

  readonly items = this._items.asReadonly();
  readonly isPanelOpen = this._isPanelOpen.asReadonly();

  readonly itemCount = computed(() => {
    return this._items().reduce((count, item) => count + item.quantity, 0);
  });

  readonly subtotal = computed(() => {
    return this._items().reduce((total, item) => {
      const price = parseFloat(item.product.price.amount);
      return total + price * item.quantity;
    }, 0);
  });

  readonly currencyCode = computed(() => {
    const firstItem = this._items()[0];
    return firstItem ? firstItem.product.price.currencyCode : 'EUR';
  });

  addItem(product: Product | ProductListItem, quantity: number): void {
    if (quantity <= 0) return;

    const currentItems = this._items();
    const existingItemIndex = currentItems.findIndex(
      (item) => item.product.id === product.id,
    );

    if (existingItemIndex !== -1) {
      // Update existing item
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + quantity,
      };
      this._items.set(updatedItems);
    } else {
      // Add new item
      this._items.set([...currentItems, { product, quantity }]);
    }

    // Open the cart panel when item is added
    this.openPanel();
  }

  removeItem(productId: number): void {
    this._items.update((items) =>
      items.filter((item) => item.product.id !== productId),
    );
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    this._items.update((items) =>
      items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  }

  clearCart(): void {
    this._items.set([]);
  }

  openPanel(): void {
    this._isPanelOpen.set(true);
  }

  closePanel(): void {
    this._isPanelOpen.set(false);
  }
}
