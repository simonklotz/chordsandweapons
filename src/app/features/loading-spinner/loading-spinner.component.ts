import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoadingSpinnerService } from './loading-spinner.service';

/**
 * Loading spinner component that displays a centered spinner overlay
 * when the application is loading.
 *
 * Usage: Add <app-loading-spinner /> to your app layout (typically in app.component.html)
 */
@Component({
  selector: 'app-loading-spinner',
  template: `
    @if (loadingService.isLoading()) {
      <div
        class="loading-spinner-overlay"
        role="status"
        aria-live="polite"
        aria-label="Loading content"
      >
        <div class="loading-spinner">
          <div class="spinner-ring"></div>
          <span class="sr-only">Loading, please wait...</span>
        </div>
      </div>
    }
  `,
  styles: [
    `
      .loading-spinner-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        backdrop-filter: blur(2px);
      }

      .loading-spinner {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }

      .spinner-ring {
        width: 64px;
        height: 64px;
        border: 8px solid rgba(255, 255, 255, 0.2);
        border-top-color: #ffffff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      /* Screen reader only text */
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }

      /* Reduce motion for users who prefer it */
      @media (prefers-reduced-motion: reduce) {
        .spinner-ring {
          animation: spin 2s linear infinite;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingSpinnerComponent {
  protected readonly loadingService = inject(LoadingSpinnerService);
}
