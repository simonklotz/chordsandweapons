import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ProductListResponse } from '../models/product-list-response.interface';
import { Product } from '../models/product.interface';

@Injectable({ providedIn: 'root' })
export class ProductApiService {
  private readonly BASE_URL = 'https://api-e6rwniv6wa-uc.a.run.app';
  private readonly BASE_URL_EMULATOR =
    'http://127.0.0.1:5001/chordsandweapons/us-central1/api';

  private readonly _http = inject(HttpClient);

  getProducts(): Observable<ProductListResponse> {
    return this._http
      .get<ProductListResponse>(this.BASE_URL + '/products')
      .pipe(
        tap((result) => {
          console.log('getProducts result', result);
        }),
      );
  }

  getProduct(id: number): Observable<Product> {
    return this._http
      .get<Product>(this.BASE_URL + `/products/${id}`)
      .pipe(tap((result) => console.log('getProduct result', result)));
  }
}
