import { Component, inject } from '@angular/core';
import { AudioPlayerService } from './audio-player.service';
import { PreviousButtonComponent } from './templates/previous-button.component';
import { NextButtonComponent } from './templates/next-button.component';
import { PlayButtonComponent } from './templates/play-button.component';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [PreviousButtonComponent, NextButtonComponent, PlayButtonComponent],
  template: `
    @if (audioPlayer.currentTrack(); as track) {
      <div class="audio-player">
        @if (audioPlayer.currentArtwork(); as artwork) {
          <img
            class="audio-player__artwork"
            [src]="artwork"
            alt="artwork"
            width="50px"
            height="50px"
          />
        }

        <app-previous-button
          [disabled]="!audioPlayer.hasPrevious()"
          (clicked)="audioPlayer.previous()"
        ></app-previous-button>
        <app-play-button
          [isPlaying]="audioPlayer.isPlaying()"
          (clicked)="audioPlayer.togglePlayPause()"
        ></app-play-button>
        <app-next-button
          [disabled]="!audioPlayer.hasNext()"
          (clicked)="audioPlayer.next()"
        ></app-next-button>

        <div class="audio-player__track-info">
          {{ track.position }}/{{ audioPlayer.playlist()?.tracks?.length }}
          {{ track.title }}
        </div>

        @if (false) {
          <progress
            class="audio-player__progress"
            [value]="audioPlayer.progress()"
            max="100"
          ></progress>
        }
      </div>
    }
  `,
})
export class AudioPlayerComponent {
  readonly audioPlayer = inject(AudioPlayerService);
}
