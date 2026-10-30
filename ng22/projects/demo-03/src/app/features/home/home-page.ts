import { Component, inject, signal } from '@angular/core';
import { Card } from '../../core/design/card/card';
import { Info } from './components/info/info';
import { Logger } from '../../core/services/logger';

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

  protected readonly logger = inject(Logger);
  protected readonly title = signal('Inicio');

  constructor() {
    console.log('Logger level', this.logger.level);
    this.logger.log('Usando el logger de logs');
  }
}
