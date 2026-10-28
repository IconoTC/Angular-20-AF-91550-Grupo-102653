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
    }
    h2 {
      margin: 0;
    }
    p {
      color: var(--color-primary);
    }
    img {
      width: 200px;
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
