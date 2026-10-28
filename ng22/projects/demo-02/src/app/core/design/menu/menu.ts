import { Component, signal } from '@angular/core';
import { MENU_OPTIONS } from '../../../app.routes';
import { MenuOption } from '../../types/menu-option';

@Component({
  imports: [],
  selector: 'ind-menu',
  styles: `
   nav {
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: 1rem;
      }

      .vertical {
        flex-direction: column;
        a {
          font-size: 1.8rem;
        }
      }

      a {
        color: inherit;
        text-decoration: none;
        font-weight: bold;
      }
    }`,
  template: ` 
  <nav>
  <ul>
   @for (option of menuOptions(); track option.label) {
     <li>
       <a [href]="option.path">{{ option.label }}</a>
     </li>
   }
  </ul> `,
})
export class Menu {
  protected readonly menuOptions = signal<MenuOption[]>(MENU_OPTIONS);
}
