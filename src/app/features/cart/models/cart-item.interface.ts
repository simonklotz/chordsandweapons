import { Product } from '../../product/product-detail/models/product.interface';
import { ProductListItem } from '../../product/product-list/models/product-list-item.interface';

export interface CartItem {
  product: Product | ProductListItem;
  quantity: number;
}
