import { Component, input, linkedSignal, output, signal } from '@angular/core';
import { CounterState } from '../../types/counter-state';

const LIMIT = 5;

@Component({
  imports: [],
  selector: 'ind-counter',
  styles: `
    div {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .limit-reached {
      color: var(--color-primary-hot);
      margin-top: 0.5rem;
    }

    .negative {
      color: var(--color-tertiary-hot);
    }
  `,
  template: `
    <h3>Counter {{ state().id }}</h3>
    <p>
      Clicks: <output>{{ state().clicks }}</output>
    </p>
    <!-- <p>Value: <output [class]=" count() < 0 ? 'negative' : '' ">{{ count() }}</output></p> -->
    <!-- <p>Value: <output [class]=" {negative: count() < 0 }">{{ count() }}</output></p> -->

    <p>
      Value: <output [class.negative]="state().count < 0">{{ state().count }}</output>
    </p>
    <div>
      <button (click)="changeCount(-1)" title="Decrement" [disabled]="state().count <= -limit()">
        ➖
      </button>
      <button (click)="changeCount(1)" title="Increment" [disabled]="state().count >= limit()">➕</button>
      <button (click)="resetCount()" title="Reset" [disabled]="state().count === 0 && state().clicks === 0">
        🟣
      </button>
    </div>
    <div class="limit-reached">
      <p [hidden]="state().count < limit()">Limite {{ limit() }} alcanzado</p>
      <p>
        @if (state().count <= -limit()) {
          <p>Limite -{{ limit() }} alcanzado</p>
          <p></p>
        }
      </p>

      <div></div>
    </div>
  `,
})
export class Counter {
  readonly state = input.required<CounterState>();

  protected readonly clicks = linkedSignal(() => this.state().clicks);
  protected readonly count = linkedSignal(() => this.state().count);

  protected readonly limit = signal(LIMIT);  

  //  @Output() protected readonly countChange = new EventEmitter<CounterState>();

  protected readonly countChange = output<CounterState>();


// constructor() {
//   effect(() => {
//     console.log('Effect', this.state());

//     this.count.set(this.state().count);
//     this.clicks.set(this.state().clicks);
//   });
// }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected changeCount(value: number): void {
    // this.count.set(this.count() + value);
    // this.clicks.set(this.clicks() + 1);
    
    this.count.update((current) => current + value);
    this.clicks.update((current) => current + 1);

    const state: CounterState = {
      id: this.state().id,
      count: this.count(),
      clicks: this.clicks(),
    }

    this.countChange.emit(state);
  }

  protected resetCount(): void {
    this.count.set(0);
    this.clicks.set(0);

    const state: CounterState = {
      id: this.state().id,
      count: this.count(),
      clicks: this.clicks(),
    }

    this.countChange.emit(state);
  }
}
