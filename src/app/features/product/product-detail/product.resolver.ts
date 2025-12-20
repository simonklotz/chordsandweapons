import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Product } from './models/product.interface';
import { ProductApiService } from '../product-api.service';

export const productResolver: ResolveFn<Product | null> = (
  route: ActivatedRouteSnapshot,
) => {
  const productId = route.params['id'] as number;
  return inject(ProductApiService).getProduct(productId);
};
