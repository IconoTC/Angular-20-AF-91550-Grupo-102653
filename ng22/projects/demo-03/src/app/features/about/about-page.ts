import { Component, signal } from '@angular/core';
import { Timestamp } from '../../core/design/timestamp/timestamp';

@Component({
  imports: [Timestamp],
  selector: 'ind-about-page',
    styleUrls: ['../page.css'],
  styles: ``,
  template: ` 
    <h2>{{ title() }}</h2> 
    <ind-timestamp />
    `,
})
export default class AboutPage {
  protected readonly title = signal('Nosotros');
}
