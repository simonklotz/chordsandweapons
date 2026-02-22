import { Price } from '../../../../shared/models/price.interface';
import { InventoryStatus } from '../../../../shared/models/inventory-status.type';
import { Track } from '../../../audio-player/models/track.interface';

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
  catalog: string;
  releaseDate: string;
}
