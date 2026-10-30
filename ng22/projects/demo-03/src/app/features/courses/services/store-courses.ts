import { DestroyRef, inject, Service, signal } from '@angular/core';
import { Course } from '../types/course';
import { ApiRepoCourses } from './api-repo-courses';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Service()
export class StoreCourses {
  readonly #repo = inject(ApiRepoCourses);
  readonly #destroyRef = inject(DestroyRef);

  readonly #courses = signal<Course[]>([]);
  readonly #isLoading = signal(false);
  readonly #error = signal<Error | null>(null);

  readonly courses = this.#courses.asReadonly();
  readonly isLoading = this.#isLoading.asReadonly();
  readonly error = this.#error.asReadonly();

  loadCourses() {
    this.#isLoading.set(true);
    this.#error.set(null);

    this.#repo
      .getAll()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (courses) => {
          this.#courses.set(courses);
          this.#isLoading.set(false);
        },
        error: (error) => {
          console.log(error);
          this.#error.set(error);
          this.#isLoading.set(false);
        },
      });
  }

  addCourses(newCourse: Omit<Course, 'id'>) {
    // asincrona -> api

    this.#repo
      .add(newCourse)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (newCourseWithId) => {
          // sincrona -> estado local
          this.#courses.update((currentCourses) => [...currentCourses, newCourseWithId]);
        },
      });
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
          this.#courses.set(updatedCourses);
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
          this.#courses.set(updatedCourses);
        },
      });
  }
}
