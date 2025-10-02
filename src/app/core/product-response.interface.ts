import { Product } from '../shared/product/product.interface';
import { PageInfo } from './page-info.interface';

export interface ProductResponse {
  products: Product[];
  pageInfo: PageInfo;
}
