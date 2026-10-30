import { Component, signal } from '@angular/core';
import { Timestamp } from '../../core/design/timestamp/timestamp';
import { CoursesList } from './components/courses-list/courses-list';

@Component({
  imports: [Timestamp, CoursesList],
  selector: 'ind-courses-page',
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
    <ind-courses-list />

    <ind-timestamp />
  `,
})
export default class CoursesPage {
  protected readonly title = signal('Cursos');
}
