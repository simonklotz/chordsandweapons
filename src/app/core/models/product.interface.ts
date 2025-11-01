import { Price } from './price.interface';
import { InventoryStatus } from './inventory-status.type';
import { Track } from './track.interface';

export interface Product {
  id: number;
  title: string;
  artist: string;
  description: string;
  price: Price;
  imageUrl: string;
  inventoryStatus: InventoryStatus;
  totalInventory: number;
  trackList: Track[];
  genre: string[];
  label: string;
  releaseDate: string;
}
