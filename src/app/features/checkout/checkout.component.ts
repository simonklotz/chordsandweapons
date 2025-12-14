import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="checkout">
      <div class="checkout__container">
        <div class="checkout__main">
          <div class="checkout__header">
            <h1 class="checkout__logo">Chordsandweapons</h1>
          </div>

          <!-- Express Checkout -->
          <div class="checkout__section">
            <h2 class="checkout__section-title">Express checkout</h2>
            <div class="checkout__express-buttons">
              <button class="express-button express-button--shop" type="button">
                shop
              </button>
              <button
                class="express-button express-button--paypal"
                type="button"
              >
                PayPal
              </button>
              <button class="express-button express-button--gpay" type="button">
                G Pay
              </button>
            </div>
            <div class="checkout__divider">
              <span>OR</span>
            </div>
          </div>

          <!-- Contact -->
          <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()">
            <div class="checkout__section">
              <div class="checkout__section-header">
                <h2 class="checkout__section-title">Contact</h2>
                <a href="#" class="checkout__link">Sign in</a>
              </div>
              <input
                type="email"
                class="checkout__input"
                placeholder="Email or mobile phone number"
                formControlName="email"
              />
              <label class="checkout__checkbox">
                <input type="checkbox" formControlName="emailNews" />
                <span>Subscribe to our newsletter</span>
              </label>
            </div>

            <!-- Delivery -->
            <div class="checkout__section">
              <h2 class="checkout__section-title">Delivery</h2>

              <div class="checkout__delivery-options">
                <label class="delivery-option delivery-option--selected">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="ship"
                    formControlName="deliveryMethod"
                    checked
                  />
                  <span class="delivery-option__label">Ship</span>
                  <svg
                    class="delivery-option__icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M18 18.5a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5m1.5-9l1.96 2.5H17V9.5m-11 9A1.5 1.5 0 0 1 4.5 17A1.5 1.5 0 0 1 6 15.5A1.5 1.5 0 0 1 7.5 17A1.5 1.5 0 0 1 6 18.5M20 8h-3V4H3c-1.11 0-2 .89-2 2v11h2a3 3 0 0 0 3 3a3 3 0 0 0 3-3h6a3 3 0 0 0 3 3a3 3 0 0 0 3-3h2v-5z"
                    />
                  </svg>
                </label>
                <label class="delivery-option">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="pickup"
                    formControlName="deliveryMethod"
                  />
                  <span class="delivery-option__label">Pick up</span>
                  <svg
                    class="delivery-option__icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5a2.5 2.5 0 0 1 0 5z"
                    />
                  </svg>
                </label>
              </div>

              <div class="checkout__form-row">
                <select class="checkout__select" formControlName="country">
                  <option value="">Country/Region</option>
                  <option value="DE" selected>Germany</option>
                  <option value="AT">Austria</option>
                  <option value="CH">Switzerland</option>
                </select>
              </div>

              <div class="checkout__form-row checkout__form-row--split">
                <input
                  type="text"
                  class="checkout__input"
                  placeholder="First name (optional)"
                  formControlName="firstName"
                />
                <input
                  type="text"
                  class="checkout__input"
                  placeholder="Last name"
                  formControlName="lastName"
                />
              </div>

              <div class="checkout__form-row">
                <input
                  type="text"
                  class="checkout__input"
                  placeholder="Address"
                  formControlName="address"
                />
              </div>

              <div class="checkout__form-row">
                <input
                  type="text"
                  class="checkout__input"
                  placeholder="Apartment, suite, etc. (optional)"
                  formControlName="apartment"
                />
              </div>

              <div class="checkout__form-row checkout__form-row--split">
                <input
                  type="text"
                  class="checkout__input"
                  placeholder="Postal code"
                  formControlName="postalCode"
                />
                <input
                  type="text"
                  class="checkout__input"
                  placeholder="City"
                  formControlName="city"
                />
              </div>
            </div>

            <!-- Shipping Method -->
            <div class="checkout__section">
              <h2 class="checkout__section-title">Shipping method</h2>
              <div class="checkout__shipping-placeholder">
                Enter your shipping address to view available shipping methods.
              </div>
            </div>

            <!-- Payment -->
            <div class="checkout__section">
              <h2 class="checkout__section-title">Payment</h2>
              <p class="checkout__section-subtitle">
                All transactions are secure and encrypted.
              </p>

              <div class="payment-options">
                <label class="payment-option payment-option--selected">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    formControlName="paymentMethod"
                    checked
                  />
                  <span>Credit card</span>
                  <div class="payment-option__logos">
                    <img src="assets/icons/visa.svg" alt="Visa" height="20" />
                    <img
                      src="assets/icons/mastercard.svg"
                      alt="Mastercard"
                      height="20"
                    />
                    <span class="payment-option__more">+5</span>
                  </div>
                </label>

                <div class="payment-form">
                  <input
                    type="text"
                    class="checkout__input"
                    placeholder="Card number"
                    formControlName="cardNumber"
                  />
                  <div class="checkout__form-row checkout__form-row--split">
                    <input
                      type="text"
                      class="checkout__input"
                      placeholder="Expiration date (MM / YY)"
                      formControlName="expirationDate"
                    />
                    <input
                      type="text"
                      class="checkout__input"
                      placeholder="Security code"
                      formControlName="securityCode"
                    />
                  </div>
                  <input
                    type="text"
                    class="checkout__input"
                    placeholder="Name on card"
                    formControlName="nameOnCard"
                  />
                  <label class="checkout__checkbox">
                    <input type="checkbox" formControlName="useSameAddress" />
                    <span>Use shipping address as billing address</span>
                  </label>
                </div>

                <label class="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    formControlName="paymentMethod"
                  />
                  <span>PayPal</span>
                  <span class="payment-option__logo-text">PayPal</span>
                </label>
              </div>
            </div>

            <!-- Remember Me -->
            <div class="checkout__section">
              <h2 class="checkout__section-title">Remember me</h2>
              <label class="checkout__checkbox">
                <input type="checkbox" formControlName="saveInfo" />
                <span>Save my information for a faster checkout</span>
              </label>
              <p class="checkout__security">
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <path
                    d="M6 0L1 2v3c0 3.09 2.13 5.97 5 6.68c2.87-.71 5-3.59 5-6.68V2L6 0z"
                  />
                </svg>
                Secure and encrypted
              </p>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="checkout__submit">Pay now</button>

            <!-- Footer Links -->
            <div class="checkout__footer-links">
              <a href="#">Refund policy</a>
              <a href="#">Shipping</a>
              <a href="#">Terms of service</a>
              <a href="#">Contact</a>
            </div>
          </form>
        </div>

        <!-- Order Summary Sidebar -->
        <div class="checkout__sidebar">
          <div class="order-summary">
            <h2 class="order-summary__title">Order Summary</h2>

            @for (item of cartService.items(); track item.product.id) {
              <div class="order-item">
                <div class="order-item__image-wrapper">
                  <img
                    [src]="item.product.images[0]"
                    [alt]="item.product.title"
                    class="order-item__image"
                  />
                  <span class="order-item__quantity">{{ item.quantity }}</span>
                </div>
                <div class="order-item__details">
                  <h3 class="order-item__title">{{ item.product.title }}</h3>
                  <p class="order-item__price">
                    {{
                      formatPrice(
                        item.product.price.amount,
                        item.product.price.currencyCode
                      )
                    }}
                  </p>
                </div>
              </div>
            }

            <div class="order-summary__totals">
              <div class="order-summary__row">
                <span>Subtotal · {{ cartService.itemCount() }} items</span>
                <span>{{
                  formatPrice(
                    cartService.subtotal().toString(),
                    cartService.currencyCode()
                  )
                }}</span>
              </div>
              <div class="order-summary__row">
                <span>Shipping</span>
                <span>Enter shipping address</span>
              </div>
              <div class="order-summary__row order-summary__row--total">
                <span>Total</span>
                <span>
                  <small>EUR</small>
                  {{
                    formatPrice(
                      cartService.subtotal().toString(),
                      cartService.currencyCode()
                    )
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CheckoutComponent {
  readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  checkoutForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    emailNews: new FormControl(true),
    deliveryMethod: new FormControl('ship'),
    country: new FormControl('DE'),
    firstName: new FormControl(''),
    lastName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    apartment: new FormControl(''),
    postalCode: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    paymentMethod: new FormControl('card'),
    cardNumber: new FormControl(''),
    expirationDate: new FormControl(''),
    securityCode: new FormControl(''),
    nameOnCard: new FormControl(''),
    useSameAddress: new FormControl(true),
    saveInfo: new FormControl(false),
  });

  formatPrice(amount: string, currencyCode: string): string {
    const numAmount = parseFloat(amount);
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: currencyCode,
    }).format(numAmount);
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      console.log('Checkout form submitted:', this.checkoutForm.value);
      // Here you would typically process the payment
    } else {
      console.log('Form is invalid');
    }
  }
}
