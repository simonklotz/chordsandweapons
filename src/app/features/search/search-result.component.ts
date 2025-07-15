import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteData } from './route-data.interface';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [],
  template: `
    <div>
      <h1>SearchResult for: {{ title }}</h1>
    </div>
  `,
})
export class SearchResultComponent {
  activatedRoute = inject(ActivatedRoute);

  get routeSnapshotData(): RouteData {
    return this.activatedRoute.snapshot.data as RouteData;
  }

  get title(): string {
    return this.routeSnapshotData.title;
  }
}
