import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'ind-separator',
  styles: `
    .divider {
      width: 100%;
      height: 3px;
      background: var(--red-to-pink-to-purple-horizontal-gradient);
      margin-block: 0rem;
    }
  `,
  template: ` <div role="separator" aria-label="Divider" class="divider"></div> `,
})
export class Separator {}
