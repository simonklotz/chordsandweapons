import { Track } from './track.interface';
import { Price } from '../../../shared/product/models/price.interface';

export interface Playlist {
  tracks: Track[];
  currentIndex: number;
  productId: number;
  artworkUrl: string;
  productPrice: Price;
}
