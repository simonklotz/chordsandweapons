import { Track } from './track.interface';
import { Price } from '../../../shared/models/price.interface';

export interface Playlist {
  tracks: Track[];
  currentIndex: number;
  trackCount: number;
  productId: number;
  artworkUrl: string;
  productPrice: Price;
}
