import { Component, signal } from '@angular/core';
import { Card } from '../../core/design/card/card';
import { Info } from './components/info/info';

@Component({
  imports: [Card, Info],
  selector: 'ind-home-page',
  styleUrls: ['../page.css'],
  styles: ``,
  template: `
    <h2>{{ title() }}</h2>
    <ind-card>
      <ind-info />
    </ind-card>
  `,
})
export default class HomePage {
  protected readonly title = signal('Inicio');
}
