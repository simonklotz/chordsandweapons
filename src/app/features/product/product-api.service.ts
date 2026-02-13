import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { ProductListResponse } from './product-list/models/product-list-response.interface';
import { Product } from './product-detail/models/product.interface';
import { QueryParams } from '../../core/services/query-params.interface';

@Injectable({ providedIn: 'root' })
export class ProductApiService extends ApiService {
  pageLimit = signal<number>(8);

  fetchProducts(params: QueryParams): Observable<ProductListResponse> {
    return this.http.get<ProductListResponse>(this.BASE_URL + '/products', {
      params: {
        ...params,
        first: this.pageLimit(),
      },
    });
  }

  searchProducts(params: QueryParams): Observable<ProductListResponse> {
    return this.http.get<ProductListResponse>(this.BASE_URL + '/products/search', {
      params: {
        ...params,
        first: this.pageLimit(),
      },
    });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.BASE_URL + `/products/${id}`);
  }
}
