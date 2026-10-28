import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'ind-about-page',
    styleUrls: ['../page.css'],
  styles: ``,
  template: ` <h2>{{ title() }}</h2> `,
})
export default class AboutPage {
  protected readonly title = signal('Nosotros');
}
