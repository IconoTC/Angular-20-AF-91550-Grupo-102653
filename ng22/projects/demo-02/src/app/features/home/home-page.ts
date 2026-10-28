import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'ind-home-page',
  styleUrls: ['../page.css'],
  styles: ``,
  template: ` <h2>{{ title() }}</h2> `,
})
export default class HomePage {
  protected readonly title = signal('Inicio');
}
