import { Price } from './price.interface';
import { InventoryStatus } from './inventory-status.type';
import { Track } from './track.interface';

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
