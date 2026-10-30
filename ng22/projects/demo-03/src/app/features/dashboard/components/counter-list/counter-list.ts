import { Component, computed, signal } from '@angular/core';
import { Counter } from '../counter/counter';
import { Card } from '../../../../core/design/card/card';
import { CounterState } from '../../types/counter-state';

const COUNTERS: CounterState[] = [
  { id: 102, count: 3, clicks: 0 },
  { id: 103, count: 0, clicks: 0 },
  { id: 104, count: 0, clicks: 0 },
];

@Component({
  imports: [Counter, Card],
  selector: 'ind-counter-list',
  styles: `
    .counters-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1rem;
    }
  `,
  template: `
    <p>
      Valor total: <output>{{ totalValue() }}</output>
    </p>
    <p>
      Total de clicks: <output>{{ totalClicks() }}</output>
    </p>

    <section class="counters-list">
      @for (item of countersState(); track item.id) {
        <ind-card>
          <ind-counter [state]="item" (countChange)="changeValue($event)" />
        </ind-card>
      }
    </section>
  `,
})
export class CounterList {
  protected readonly totalValue = computed(() => {
    return this.countersState().reduce((acc, item) => acc + item.count, 0);
  });
  protected readonly totalClicks = computed(() => {
    return this.countersState().reduce((acc, item) => acc + item.clicks, 0);
  });

  protected readonly countersState = signal(COUNTERS);

  changeValue(value: CounterState): void {
    console.log('Change', value);


    this.countersState.update((current) => {
      return current.map((item) => (item.id === value.id ? value : item));
    });

  }
}
