import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'ind-dashboard-page',
    styleUrls: ['../page.css'],
  styles: ``,
  template: ` <h2>{{ title() }}</h2> `,
})
export default class DashboardPage {
  protected readonly title = signal('Dashboard');
}
