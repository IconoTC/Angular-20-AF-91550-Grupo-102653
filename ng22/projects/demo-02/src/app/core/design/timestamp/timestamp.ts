import { Component, inject } from '@angular/core';
import { TimeService } from '../../services/time.service';

@Component({
  imports: [],
  selector: 'ind-timestamp',
  template: `<output>{{ time.getTime() }}</output> `,
  styles: `
    :host {
      display: inline-block;
      font-size: 0.9em;
      color: var(--color-primary-hot);
      background-color: var(--color-background-primary);
      border: 1px solid var(--color-primary);
      border-radius: 0.5rem;
      padding: 0.2rem 0.5rem;
      margin-left: 0.5rem;
    }
  `,
})
export class Timestamp {
  protected readonly time = inject(TimeService);

  //constructor(protected readonly timeService: TimeService) {}
}
