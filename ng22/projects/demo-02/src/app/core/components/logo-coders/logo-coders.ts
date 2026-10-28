import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'ind-logo-coders',
  styles: `
    path {
      cursor: pointer;
    }

    path:nth-of-type(1):hover {
      fill: var(--color-primary-hot);
      transform: scale(1.1);
      transition: transform 0.3s ease-in-out;
    }

    path:nth-of-type(2):hover {
      fill: var(--color-tertiary-hot);
      transform: translate(-900px, -900px) scale(1.1);
      transition: transform 0.3s ease-in-out;
    }
  `,
  templateUrl: './logo-coders.svg',
})
export class LogoCoders {
  protected readonly size = signal('5rem');
  protected readonly upperColor = signal('var(--color-primary)');
  protected readonly downColor = signal('var(--color-secondary)');

  onClick(path: 'upper' | 'down') {
    console.log(`Clicked on ${path} path`);
  }
}
