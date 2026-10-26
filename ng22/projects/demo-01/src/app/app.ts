import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'ind-root',
  styles: [],
  template: `
    <h1>Hola, {{ title() }}</h1>

    <router-outlet />
  `,
})
export class App {
  protected readonly title = signal('Demo 01');
}
