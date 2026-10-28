import { Component, signal } from '@angular/core';
import { Counter } from '../counter/counter';
import { Card } from '../../../../core/design/card/card';

@Component({
  imports: [Counter, Card],
  selector: 'ind-counter-list',
  styles: ``,
  template: `
    <p>
      Valor total: <output>{{ totalValue() }}</output>
    </p>
    <p>
      Total de clicks: <output>{{ totalClicks() }}</output>
    </p>
    <ind-card>
      <ind-counter (countChange)="changeValue($event)" />
    </ind-card>

    <ind-card>
      <ind-counter />
    </ind-card>

    <ind-card>
      <ind-counter />
    </ind-card>
  `,
})
export class CounterList {
  protected readonly totalValue = signal(0);
  protected readonly totalClicks = signal(0);

  changeValue(value: number): void {
    console.log('Change', value);
    this.totalValue.update((current) => current + value);
    this.totalClicks.update((current) => current + 1);
  }
}
