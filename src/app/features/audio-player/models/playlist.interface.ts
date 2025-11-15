import { Track } from '../../../core/models/track.interface';
import { Price } from '../../../core/models/price.interface';

export interface Playlist {
  tracks: Track[];
  currentIndex: number;
  productId: number;
  artworkUrl: string;
  productPrice: Price;
}
