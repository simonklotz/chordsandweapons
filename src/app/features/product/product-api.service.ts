import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductListResponse } from './product-list/models/product-list-response.interface';
import { Product } from './product-detail/models/product.interface';
import { ApiService } from '../../core/services/api.service';

@Injectable({ providedIn: 'root' })
export class ProductApiService extends ApiService {
  fetchProducts(): Observable<ProductListResponse> {
    return this.http.get<ProductListResponse>(this.BASE_URL + '/products');
  }

  searchProducts(searchQuery: string): Observable<ProductListResponse> {
    return this.http.get<ProductListResponse>(
      this.BASE_URL + '/products/search',
      {
        params: { q: searchQuery },
      },
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.BASE_URL + `/products/${id}`);
  }
}
