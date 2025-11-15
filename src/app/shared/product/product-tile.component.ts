import { Component, inject, input, OnInit } from '@angular/core';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { Router } from '@angular/router';
import { ProductListItem } from '../../core/models/product-list-item.interface';
import { AudioPlayerService } from '../../features/audio-player/audio-player.service';

@Component({
  selector: 'app-product-tile',
  standalone: true,
  template: `
    <div
      tabindex="0"
      class="product-tile__wrapper"
      (click)="openDetailView()"
      (keydown.enter)="openDetailView()"
      (keydown.space)="openDetailView()"
    >
      <div
        class="product-image"
        [ngStyle]="{ 'background-image': 'url(' + imageUrl + ')' }"
      >
        <div
          tabindex="0"
          class="play-button"
          (click)="play($event)"
          (keydown.enter)="play($event)"
          (keydown.space)="play($event)"
        ></div>
      </div>
      <div class="product-info">
        <h3 class="product-info__title">
          {{ product().title }}
        </h3>
        <h4 class="product-info__artist">{{ product().artist }}</h4>
        <div>
          <span>{{ price | currency: currencyCode : true }}</span>
        </div>
      </div>
    </div>
  `,
  imports: [CurrencyPipe, NgStyle],
})
export class ProductTileComponent implements OnInit {
  readonly product = input.required<ProductListItem>();

  private readonly _router = inject(Router);
  private readonly _audioPlayer = inject(AudioPlayerService);

  get imageUrl(): string {
    return this.product().imageUrl ?? 'assets/images/fallback-artwork.jpg';
  }

  get altText(): string {
    return `${this.product().title} artwork`;
  }

  get price(): string {
    return this.product().price.amount;
  }

  get currencyCode(): string {
    return this.product().price.currencyCode;
  }

  ngOnInit() {
    console.log('Product', this.product());
  }

  openDetailView(): void {
    this._router.navigate(['release', this.product().id]);
  }

  play(event: Event): void {
    event.stopPropagation();

    this._audioPlayer.loadPlaylist(
      this.product().trackList,
      0,
      this.product().imageUrl,
    );
  }
}
