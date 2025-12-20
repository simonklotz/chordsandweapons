import { Price } from '../../../../shared/product/models/price.interface';
import { Track } from '../../../audio-player/models/track.interface';
import { InventoryStatus } from '../../../../shared/product/models/inventory-status.type';

export interface Product {
  id: number;
  title: string;
  artist: string;
  price: Price;
  images: string[];
  description: string;
  totalInventory: number;
  inventoryStatus: InventoryStatus;
  trackList: Track[];
  genre: string[];
  format: string;
  label: string;
  releaseDate: string;
}
