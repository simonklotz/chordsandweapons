import { Price } from '../../../../shared/product/models/price.interface';
import { InventoryStatus } from '../../../../shared/product/models/inventory-status.type';
import { Track } from '../../../audio-player/models/track.interface';

export interface ProductListItem {
  id: number;
  title: string;
  artist: string;
  price: Price;
  images: string[];
  inventoryStatus: InventoryStatus;
  trackList: Track[];
}
