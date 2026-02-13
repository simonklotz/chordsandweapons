import { Data } from '@angular/router';

export interface RouteData extends Data {
  title: string;
  filter?: string;
  isSearch?: boolean;
}
