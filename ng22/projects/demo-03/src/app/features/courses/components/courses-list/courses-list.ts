import { Component, ElementRef, inject,  viewChild } from '@angular/core';
import { CourseItem } from '../course-item/course-item';
import { Card } from '../../../../core/design/card/card';
import { JsonPipe } from '@angular/common';
import { CoursesForm } from '../courses-form/courses-form';
import { StoreCourses } from '../../services/store-courses';

@Component({
  imports: [Card, CourseItem, CoursesForm, JsonPipe],
  selector: 'ind-courses-list',
  styles: `
    .courses-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }
    ind-card {
      max-width: 250px;
    }
  `,
  template: `
    @if (isLoading()) {
      <p>Loading ...</p>
    }

    @if (error()) {
      <p>Error: {{ error()?.message }}</p>
    }

    @if (courses().length === 0 && !isLoading() && !error()) {
      <p>No courses available.</p>
    }

    @if (courses().length > 0) {
      <details #detailsAdd>
        <summary>Añadir curso</summary>
        <ind-courses-form (addEvent)="addCourses()" />
      </details>

      <ul class="courses-list">
        @for (course of courses(); track course.id) {
          <ind-card>
            <ind-course-item
              [course]="course"
            />
          </ind-card>
        }
      </ul>
    }

    <pre>
      {{ courses() | json }}
  </pre>
  `,
})
export class CoursesList {
  readonly store = inject(StoreCourses);

  protected readonly courses = this.store.courses;
  protected readonly isLoading = this.store.isLoading;
  protected readonly error = this.store.error;


  readonly detailsAdd = viewChild<ElementRef<HTMLDetailsElement>>('detailsAdd');

  addCourses() {
    (this.detailsAdd() as ElementRef<HTMLDetailsElement>).nativeElement.open = false;
  }

}
