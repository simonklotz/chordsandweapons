import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingSpinnerService } from './loading-spinner.service';

/**
 * HTTP Interceptor that automatically shows/hides the loading spinner
 * for all HTTP requests.
 *
 * Add this to your app.config.ts providers:
 * provideHttpClient(withInterceptors([loadingInterceptor]))
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingSpinnerService);

  // Increment request counter when request starts
  loadingService.incrementRequests();

  // Decrement counter when request completes (success or error)
  return next(req).pipe(
    finalize(() => {
      loadingService.decrementRequests();
    }),
  );
};
