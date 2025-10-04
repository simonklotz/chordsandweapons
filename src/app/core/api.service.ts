import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { ProductResponse } from './product-response.interface';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly BASE_URL = 'https://api-e6rwniv6wa-uc.a.run.app';
  private readonly BASE_URL_EMULATOR =
    'http://127.0.0.1:5001/chordsandweapons/us-central1/api';
  private readonly _http = inject(HttpClient);

  getProducts(): Observable<ProductResponse> {
    return this._http.get<ProductResponse>(this.BASE_URL + '/products').pipe(
      tap((result) => console.log('result', result)),
      map((result) => ({
        products: [...result.products, ...result.products, ...result.products],
        pageInfo: result.pageInfo,
      })),
    );
  }
}
