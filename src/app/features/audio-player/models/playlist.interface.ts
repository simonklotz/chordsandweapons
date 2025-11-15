import { Track } from '../../../core/models/track.interface';

export interface Playlist {
  tracks: Track[];
  currentIndex: number;
  artworkUrl?: string;
}
