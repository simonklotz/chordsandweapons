import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Howl, Howler } from 'howler';
import { Track } from './models/track.interface';
import { Playlist } from './models/playlist.interface';
import { PlaybackState } from './models/playback-state.type';
import { Price } from '../../shared/models/price.interface';

@Injectable({
  providedIn: 'root',
})
export class AudioPlayerService {
  private readonly destroyRef = inject(DestroyRef);

  private readonly _playlist = signal<Playlist | null>(null);
  private readonly _playbackState = signal<PlaybackState>('idle');
  private readonly _currentTime = signal<number>(0);
  private readonly _duration = signal<number>(0);
  private readonly _volume = signal<number>(1);
  private readonly _isMuted = signal<boolean>(false);
  private readonly _errorMessage = signal<string | null>(null);

  private howl: Howl | null = null;
  private progressAnimationFrame: number | null = null;

  readonly playlist = this._playlist.asReadonly();
  readonly playbackState = this._playbackState.asReadonly();
  readonly currentTime = this._currentTime.asReadonly();
  readonly duration = this._duration.asReadonly();
  readonly volume = this._volume.asReadonly();
  readonly isMuted = this._isMuted.asReadonly();
  readonly errorMessage = this._errorMessage.asReadonly();

  readonly currentTrack = computed<Track | null>(() => {
    const playlist = this._playlist();
    if (!playlist || playlist.currentIndex < 0 || playlist.currentIndex >= playlist.tracks.length) {
      return null;
    }
    return playlist.tracks[playlist.currentIndex];
  });

  readonly currentArtwork = computed<string | undefined>(() => {
    return this._playlist()?.artworkUrl;
  });

  readonly progress = computed<number>(() => {
    const duration = this._duration();
    const currentTime = this._currentTime();
    return duration > 0 ? (currentTime / duration) * 100 : 0;
  });

  readonly isPlaying = computed<boolean>(() => {
    return this._playbackState() === 'playing';
  });

  readonly isPaused = computed<boolean>(() => {
    return this._playbackState() === 'paused';
  });

  readonly hasNext = computed(() => {
    const playlist = this._playlist();
    if (!playlist) {
      return false;
    }
    return playlist.currentIndex < playlist.tracks.length - 1;
  });

  readonly hasPrevious = computed<boolean>(() => {
    const playlist = this._playlist();
    if (!playlist) {
      return false;
    }
    return playlist.currentIndex > 0;
  });

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.cleanup();
    });
  }

  loadPlaylist(
    productId: number,
    tracks: Track[],
    artworkUrl: string,
    productPrice: Price,
    startIndex = 0,
  ): void {
    const playableTracks = tracks.filter((track) => track.previewUrl);

    if (playableTracks.length === 0) {
      this._errorMessage.set('No playable tracks found');
      this._playbackState.set('error');
      return;
    }

    const validStartIndex = Math.min(startIndex, playableTracks.length - 1);

    this.cleanup();

    this._playlist.set({
      tracks: playableTracks,
      currentIndex: validStartIndex,
      productId,
      artworkUrl,
      productPrice,
    });

    this.loadTrack(validStartIndex);
  }

  playTrack(index: number): void {
    const playlist = this._playlist();
    if (!playlist) {
      this._errorMessage.set('No playlist loaded');
      return;
    }

    if (index < 0 || index >= playlist.tracks.length) {
      this._errorMessage.set('Invalid track index');
      return;
    }

    this._playlist.update((playlist) => (playlist ? { ...playlist, currentIndex: index } : null));

    this.loadTrack(index);
  }

  togglePlayPause(): void {
    if (this._playbackState() === 'playing') {
      this.pause();
    } else {
      this.play();
    }
  }

  play(): void {
    if (!this.howl) {
      this._errorMessage.set('No audio loaded');
      return;
    }

    this.howl.play();
  }

  pause(): void {
    if (!this.howl) {
      return;
    }

    this.howl.pause();
  }

  stop(): void {
    if (!this.howl) {
      return;
    }

    this.howl.stop();
    this._currentTime.set(0);
  }

  next(): void {
    const playlist = this._playlist();
    if (!playlist) {
      return;
    }

    const nextIndex = playlist.currentIndex + 1;
    if (nextIndex < playlist.tracks.length) {
      this.playTrack(nextIndex);
    }
  }

  previous(): void {
    const playlist = this._playlist();
    if (!playlist) {
      return;
    }

    const prevIndex = playlist.currentIndex - 1;
    if (prevIndex >= 0) {
      this.playTrack(prevIndex);
    }
  }

  seek(seconds: number): void {
    if (!this.howl) {
      return;
    }

    const duration = this._duration();
    const clampedSeconds = Math.max(0, Math.min(seconds, duration));

    this.howl.seek(clampedSeconds);
    this._currentTime.set(clampedSeconds);
  }

  seekToPercentage(percentage: number): void {
    const duration = this._duration();
    const clampedPercentage = Math.max(0, Math.min(percentage, 100));
    const seconds = (clampedPercentage / 100) * duration;

    this.seek(seconds);
  }

  setVolume(volume: number): void {
    const clampedVolume = Math.max(0, Math.min(volume, 1));
    this._volume.set(clampedVolume);

    if (this.howl) {
      this.howl.volume(clampedVolume);
    }

    // Also update global volume
    Howler.volume(clampedVolume);
  }

  toggleMute(): void {
    const currentMuteState = this._isMuted();
    this.setMute(!currentMuteState);
  }

  setMute(muted: boolean): void {
    this._isMuted.set(muted);

    if (this.howl) {
      this.howl.mute(muted);
    }

    // Also update global mute
    Howler.mute(muted);
  }

  getRate(): number {
    return this.howl?.rate() ?? 1.0;
  }

  setRate(rate: number): void {
    if (!this.howl) return;

    const clampedRate = Math.max(0.5, Math.min(rate, 4.0));
    this.howl.rate(clampedRate);
  }

  reset(): void {
    this.cleanup();
    this._playlist.set(null);
    this._playbackState.set('idle');
    this._errorMessage.set('null');
  }

  private loadTrack(trackIndex: number): void {
    const playlist = this._playlist();
    if (!playlist) {
      return;
    }

    const track = playlist.tracks[trackIndex];

    if (!track?.previewUrl) {
      this._errorMessage.set('Track has no preview URL');
      this._playbackState.set('error');
      return;
    }

    this.cleanup();
    this._errorMessage.set(null);

    this._playbackState.set('loading');

    this.howl = new Howl({
      src: [track.previewUrl],
      html5: false,
      preload: true,
      volume: this._volume(),
      mute: this._isMuted(),
      onload: () => {
        if (this.howl) {
          this._duration.set(this.howl.duration());
          this._playbackState.set('paused');
          // Auto-play after loading
          this.play();
        }
      },
      onloaderror: (_id, error) => {
        this.handleError(`Failed to load track: ${error}`);
      },
      onplayerror: (_id, error) => {
        this.handleError(`Failed to play track: ${error}`);
      },
      onplay: () => {
        this._playbackState.set('playing');
        this.startProgressTracking();
      },
      onpause: () => {
        this._playbackState.set('paused');
        this.stopProgressTracking();
      },
      onstop: () => {
        this._playbackState.set('paused');
        this._currentTime.set(0);
        this.stopProgressTracking();
      },
      onend: () => {
        this.handleTrackEnd();
      },
      onseek: () => {
        if (this.howl) {
          this._currentTime.set(this.howl.seek() as number);
        }
      },
      onvolume: () => {
        if (this.howl) {
          this._volume.set(this.howl.volume());
        }
      },
      onmute: () => {
        if (this.howl) {
          this._isMuted.set(this.howl.mute());
        }
      },
    });
  }

  private handleTrackEnd(): void {
    this.stopProgressTracking();
    this._currentTime.set(0);

    // Auto-play next track if available
    const playlist = this._playlist();
    if (playlist && playlist.currentIndex < playlist.tracks.length - 1) {
      this.next();
    } else {
      this._playbackState.set('paused');
    }
  }

  private handleError(message: string): void {
    this._errorMessage.set(message);
    this._playbackState.set('error');
    this.stopProgressTracking();
  }

  private startProgressTracking(): void {
    this.stopProgressTracking();

    const updateProgress = (): void => {
      if (this.howl && this._playbackState() === 'playing') {
        const currentSeek = this.howl.seek() as number;
        this._currentTime.set(currentSeek);
        this.progressAnimationFrame = requestAnimationFrame(updateProgress);
      }
    };

    this.progressAnimationFrame = requestAnimationFrame(updateProgress);
  }

  private stopProgressTracking(): void {
    if (this.progressAnimationFrame !== null) {
      cancelAnimationFrame(this.progressAnimationFrame);
      this.progressAnimationFrame = null;
    }
  }

  private cleanup() {
    this.stopProgressTracking();

    if (this.howl) {
      this.howl.unload();
      this.howl = null;
    }
  }
}
