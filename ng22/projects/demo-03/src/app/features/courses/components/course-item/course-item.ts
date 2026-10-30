import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import { Course } from '../../types/course';
import { StoreCourses } from '../../services/store-courses';

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
    <p>
      <label>
        <input type="checkbox" [checked]="course().isOfficial" (change)="sendChange()" />
        Official Course
      </label>
    </p>
    <button (click)="sendDelete()">Eliminar</button>
  `,
})
export class CourseItem {
  readonly store = inject(StoreCourses);

  readonly course = input.required<Course>();

  sendDelete() {
    this.store.deleteCourse(this.course().id);
  }

  sendChange() {
    const updatedCourse = { ...this.course(), isOfficial: !this.course().isOfficial };
     this.store.updateCourse(updatedCourse);
  }
}
