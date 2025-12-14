import { Product } from './product.interface';
import { ProductListItem } from './product-list-item.interface';

export interface CartItem {
  product: Product | ProductListItem;
  quantity: number;
}
