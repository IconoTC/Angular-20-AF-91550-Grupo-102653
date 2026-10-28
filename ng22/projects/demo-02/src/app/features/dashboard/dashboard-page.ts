import { Component, signal } from '@angular/core';
import { CounterList } from './components/counter-list/counter-list';
import { Timestamp } from '../../core/design/timestamp/timestamp';

@Component({
  imports: [CounterList, Timestamp],
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
    <ind-timestamp />
  `,
})
export default class DashboardPage {
  protected readonly title = signal('Dashboard');
}
