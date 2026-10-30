import { Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { CourseItem } from '../course-item/course-item';
import { Card } from '../../../../core/design/card/card';
import { Course } from '../../types/course';
import { JsonPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CoursesForm } from '../courses-form/courses-form';
import { ApiRepoCourses } from '../../services/api-repo-courses';

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
        <ind-courses-form (addEvent)="addCourses($event)" />
      </details>

      <ul class="courses-list">
        @for (course of courses(); track course.id) {
          <ind-card>
            <ind-course-item
              [course]="course"
              (changeEvent)="updateCourse($event)"
              (deleteEvent)="deleteCourse($event)"
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
  readonly #repo = inject(ApiRepoCourses);
  readonly #destroyRef = inject(DestroyRef);

  protected readonly courses = signal<Course[]>([]);
  protected readonly isLoading = signal(false);
  protected readonly error = signal<Error | null>(null);

  readonly detailsAdd = viewChild<ElementRef<HTMLDetailsElement>>('detailsAdd');

  constructor() {
    this.loadCourses();
  }

  // #generateId() {
  //   return Math.trunc(Math.random() * 10_000).toString();
  // }

  loadCourses() {
    // getCoursesPromise().then((courses) => {
    //   this.courses.set(courses);
    // });

    this.isLoading.set(true);
    this.error.set(null);

    this.#repo
      .getAll()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (courses) => {
          this.courses.set(courses);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.log(error);
          this.error.set(error);
          this.isLoading.set(false);
        },
      });

    // const courses = await getCoursesPromise()
    // this.courses.set(courses);
  }

  addCourses(newCourse: Omit<Course, 'id'>) {
    // const newCourseWithId: Course = {
    //   ...newCourse,
    //   id: this.#generateId(),
    // };

    // asincrona -> api

    this.#repo
      .add(newCourse)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (newCourseWithId) => {
          // sincrona -> estado local
          this.courses.update((currentCourses) => [...currentCourses, newCourseWithId]);
          (this.detailsAdd() as ElementRef<HTMLDetailsElement>).nativeElement.open = false;
        },
      });

    // this.courses.update((currentCourses) => [...currentCourses, newCourseWithId]);
    // (this.detailsAdd() as ElementRef<HTMLDetailsElement>).nativeElement.open = false;
  }

  updateCourse(updatedCourse: Course) {
    // asincrono -> api

    const { id, ...data } = updatedCourse;
    this.#repo
      .update(id, data)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (updatedCourse) => {
          // sincrono -> estado local
          const updatedCourses = this.courses().map((course) =>
            course.id === updatedCourse.id ? updatedCourse : course,
          );
          this.courses.set(updatedCourses);
        },
      });
  }

  deleteCourse(courseId: Course['id']) {
    // asincrona -> api
    this.#repo
      .delete(courseId)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: () => {
          // sincrona -> estado local
          const updatedCourses = this.courses().filter((course) => course.id !== courseId);
          this.courses.set(updatedCourses);
        },
      });
  }
}
