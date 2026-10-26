import { Component, signal, ViewEncapsulation } from '@angular/core';
import { getCourses } from '../../data/courses';

@Component({
  imports: [],
  selector: 'ind-course-item',
  encapsulation: ViewEncapsulation.Emulated,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin: 1rem;
      padding: 1rem;
      border: 1px solid var(--color-primary);
      border-radius: 4px;
    }
    p {
      color: blue;
    }
    img {
      width: 300px;
    }
  `,
  // styleUrls: ['./course.css'],
  // templateUrl: './course.html',
  template: `
    <img [src]="course().image" [alt]="course().title" />
    <h2>{{ course().title }}</h2>
    <p>{{ course().description }}</p>
  `,
})
export class CourseItem {
  protected readonly course = signal(getCourses()[0]);
}
