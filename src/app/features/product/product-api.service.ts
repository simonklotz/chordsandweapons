import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { ProductListResponse } from './product-list/models/product-list-response.interface';
import { Product } from './product-detail/models/product.interface';

@Injectable({ providedIn: 'root' })
export class ProductApiService extends ApiService {
  fetchProducts(first: number, after?: string): Observable<ProductListResponse> {
    return this.http.get<ProductListResponse>(this.BASE_URL + '/products', {
      params: after ? { first, after } : { first },
    });
  }

  fetchProductsByGenre(
    genre: string,
    first: number,
    after?: string,
  ): Observable<ProductListResponse> {
    return this.http.get<ProductListResponse>(this.BASE_URL + '/products', {
      params: after ? { genre, first, after } : { genre, first },
    });
  }

  searchProducts(searchQuery: string): Observable<ProductListResponse> {
    return this.http.get<ProductListResponse>(this.BASE_URL + '/products/search', {
      params: { q: searchQuery, first: 8 },
    });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.BASE_URL + `/products/${id}`);
  }
}
