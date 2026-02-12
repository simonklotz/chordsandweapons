import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export abstract class ApiService {
  protected readonly http = inject(HttpClient);
  protected readonly BASE_URL = 'https://api-e6rwniv6wa-uc.a.run.app';
  protected readonly BASE_URL_EMULATOR = 'http://127.0.0.1:5001/chordsandweapons/us-central1/api';
}
