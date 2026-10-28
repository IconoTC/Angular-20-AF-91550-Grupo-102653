import { Component, signal } from '@angular/core';
import { CourseDetails } from './components/course-details/course-details';
import { CourseItem } from './components/course-item/course-item';
import { Card } from '../../core/design/card/card';

@Component({
  imports: [Card, CourseItem, CourseDetails],
  selector: 'ind-courses-page',
  styleUrls: ['../page.css'],
  styles: ``,
  template: `
    <h2>{{ title() }}</h2>
    <ind-card>
      <ind-course-item />
    </ind-card>

    <details>
      <summary>Detalle del curso</summary>
      <ind-course-details />
    </details>
  `,
})
export default class CoursesPage {
  protected readonly title = signal('Cursos');
}
