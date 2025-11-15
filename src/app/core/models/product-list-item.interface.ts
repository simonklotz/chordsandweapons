import { Price } from './price.interface';
import { InventoryStatus } from './inventory-status.type';
import { Track } from './track.interface';

export interface ProductListItem {
  id: number;
  title: string;
  artist: string;
  price: Price;
  imageUrl: string;
  inventoryStatus: InventoryStatus;
  trackList: Track[];
}
