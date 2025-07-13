import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<h1>{{ title() }}</h1>`,
  imports: [RouterOutlet],
})
export class App {
  protected readonly title = signal('chordsandweapons');
}
