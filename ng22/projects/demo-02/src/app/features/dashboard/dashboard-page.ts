import { Component, signal } from '@angular/core';
import { CounterList } from './components/counter-list/counter-list';

@Component({
  imports: [CounterList],
  selector: 'ind-dashboard-page',
  styleUrls: ['../page.css'],
  styles: `
    :host {
      display: block;
      width: 80vw;
      margin: 0 auto;
    }
  `,
  template: `
    <h2>{{ title() }}</h2>
    <ind-counter-list />
  `,
})
export default class DashboardPage {
  protected readonly title = signal('Dashboard');
}
