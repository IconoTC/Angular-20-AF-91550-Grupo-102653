import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'ind-card',
  styles: `
    :host {
      display: block;
      border: 1px solid var(--color-primary);
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin: 1rem;
    }
  `,
  template: ` <ng-content></ng-content> `,
})
export class Card {}
