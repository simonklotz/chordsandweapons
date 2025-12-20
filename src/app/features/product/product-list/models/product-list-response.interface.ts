import { ProductListItem } from './product-list-item.interface';

export interface ProductListResponse {
  products: ProductListItem[];
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
}
