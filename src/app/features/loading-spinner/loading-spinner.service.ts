import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingSpinnerService {
  private activeRequests = signal<number>(0);
  private manualLoading = signal<boolean>(false);

  readonly isLoading = computed(() => this.activeRequests() > 0 || this.manualLoading());

  /**
   * Increment the active request counter
   * Called by the HTTP interceptor when a request starts
   */
  incrementRequests(): void {
    this.activeRequests.update((count) => count + 1);
  }

  /**
   * Decrement the active request counter
   * Called by the HTTP interceptor when a request completes
   */
  decrementRequests(): void {
    this.activeRequests.update((count) => Math.max(0, count - 1));
  }

  /**
   * Manually show the loading spinner
   * Useful for non-HTTP operations
   */
  show(): void {
    this.manualLoading.set(true);
  }

  /**
   * Manually hide the loading spinner
   */
  hide(): void {
    this.manualLoading.set(false);
  }

  /**
   * Reset all loading states
   * Useful for error recovery
   */
  reset(): void {
    this.activeRequests.set(0);
    this.manualLoading.set(false);
  }
}
