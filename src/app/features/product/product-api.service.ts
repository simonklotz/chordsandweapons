import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { ProductListResponse } from './product-list/models/product-list-response.interface';
import { Product } from './product-detail/models/product.interface';
import { QueryParams } from '../../core/models/query-params.interface';

@Injectable({ providedIn: 'root' })
export class ProductApiService extends ApiService {
  pageLimit = signal<number>(8);

  /**
   * @param params Change sorting behavior by adding e.g.
   * 'sortKey: ProductSortKey.PRICE' and 'reverse: true'
   */
  fetchProducts(params: QueryParams): Observable<ProductListResponse> {
    return this.http.get<ProductListResponse>(this.BASE_URL + '/products', {
      params: {
        ...params,
        first: this.pageLimit(),
      },
    });
  }

  /**
   * @param params Change sorting behavior by adding e.g.
   * 'sortKey: SearchSortKey.PRICE' and 'reverse: true'
   */
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
