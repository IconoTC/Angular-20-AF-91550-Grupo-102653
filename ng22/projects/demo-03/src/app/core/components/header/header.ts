import { Component, inject, input } from '@angular/core';
import { User } from '../user/user';
import { Separator } from '../../design/separator/separator';
import { Toggle } from '../toggle/toggle';
import { Search } from '../search/search';
import { StoreCourses } from '../../../features/courses/services/store-courses';

@Component({
  imports: [User, Toggle, Search, Separator],
  selector: 'ind-header',
  styles: `
    :host {
      margin-bottom: 1.5rem;
      min-height: 15vh;
      color: var(--color-primary-hot);
      background-color: var(--color-background-primary);
    }

    header {
      padding: 1rem 2rem;
      display: grid;
      grid-template-columns: minmax(auto, max-content) 1fr minmax(auto, max-content);
      justify-items: center;
      align-items: center;
      text-align: center;
    }

    .left-side {
      min-width: 5rem;
    }

    hgroup {
      max-width: 15rem;
    }

    h1 {
      color: var(--color-primary);
      font-family: var(--font-family-heading);
      font-optical-sizing: auto;
      font-size: 3.125rem;
      font-weight: 500;
      line-height: 100%;
      letter-spacing: -0.125rem;
      margin: 0;
    }

    .right-side {
      min-width: 5rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.5rem;

      .icons {
        display: flex;
        gap: 1rem;
      }
    }

    .bottom-row {
      gap: 0.5rem;
      grid-column: span 3;
      margin-top: 0.6rem;
      display: flex;
      flex-direction: column;
      width: 100%;
      .second-line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        margin-top: 1rem;
      }
    }
  `,
  template: `
    <header class="container">
      <div class="left-side">
        <ng-content select="[slot=logo]"></ng-content>
      </div>
      <hgroup>
        <h1>{{ title() }}</h1>
      </hgroup>
      <div class="right-side">
        <div class="user-icons">
          <ind-user />
        </div>
        <div class="system-icons">
          <ind-toggle />
        </div>
        <p>Cursos: {{ storeCourses.courses().length }}</p>
      </div>
      <div class="bottom-row">
        <p class="first-line">{{ subtitle() }}</p>
        <div class="second-line">
          <div>
            <ng-content select="[slot=menu]"></ng-content>
          </div>
          <div>
            <ind-search />
          </div>
        </div>
      </div>
    </header>
    <ind-separator />
  `,
})
export class Header {

  protected readonly storeCourses = inject(StoreCourses);

  readonly title = input('Demo', {
    // eslint-disable-next-line @angular-eslint/no-input-rename
    alias: 'app-title',
  });
  readonly subtitle = input.required<string>();
}
