import { Injectable, signal } from '@angular/core';
import { Track } from '../models/track.interface';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root',
})
export class AudioPlayerService {
  private playlist = new Map<number, string>();

  currentTrack = signal<string>('');

  loadPlaylist(trackList: Track[]): void {
    this.playlist.clear();

    for (const track of trackList) {
      if (track.previewUrl) {
        this.playlist.set(track.position, track.previewUrl);
      }
    }
  }

  play(track: Track): void {
    if (!track.previewUrl) {
      return;
    }

    this.currentTrack.set(track.previewUrl);

    const playerId = this.player().play();
  }

  player(): Howl {
    return new Howl({
      src: this.currentTrack(),
    });
  }
}
