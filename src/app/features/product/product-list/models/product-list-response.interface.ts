import { ProductListItem } from './product-list-item.interface';
import { PageInfo } from './page-info.interface';

export interface ProductListResponse extends PageInfo {
  products: ProductListItem[];
}
