import { Component,  output,  signal } from '@angular/core';

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
    <p>
      Clicks: <output>{{ clicks() }}</output>
    </p>
    <!-- <p>Value: <output [class]=" count() < 0 ? 'negative' : '' ">{{ count() }}</output></p> -->
    <!-- <p>Value: <output [class]=" {negative: count() < 0 }">{{ count() }}</output></p> -->

    <p>
      Value: <output [class.negative]="count() < 0">{{ count() }}</output>
    </p>
    <div>
      <button (click)="changeCount(-1)" title="Decrement" [disabled]="count() <= -limit()">
        ➖
      </button>
      <button (click)="changeCount(1)" title="Increment" [disabled]="count() >= limit()">➕</button>
      <button (click)="resetCount()" title="Reset" [disabled]="count() === 0 && clicks() === 0">
        🟣
      </button>
    </div>
    <div class="limit-reached">
      <p [hidden]="count() < limit()">Limite {{ limit() }} alcanzado</p>
      <p>
        @if (count() <= -limit()) {
          <p>Limite -{{ limit() }} alcanzado</p>
          <p></p>
        }
      </p>

      <div></div>
    </div>
  `,
})
export class Counter {
  protected readonly clicks = signal(0);
  protected readonly count = signal(0);

  protected readonly limit = signal(LIMIT);

  //  @Output() protected readonly countChange = new EventEmitter<number>();

   protected readonly countChange = output<number>()

  protected changeCount(value: number): void {
    // this.count.set(this.count() + value);
    // this.clicks.set(this.clicks() + 1);
    this.count.update((current) => current + value);
    this.clicks.update((current) => current + 1);

    this.countChange.emit(this.count());
  }

  protected resetCount(): void {
    this.count.set(0);
    this.clicks.set(0);

    this.countChange.emit(this.count());
  }
}
