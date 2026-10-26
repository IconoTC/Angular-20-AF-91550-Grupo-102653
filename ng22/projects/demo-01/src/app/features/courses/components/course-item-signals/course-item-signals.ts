import { Component, signal } from '@angular/core';
import { getCourses } from '../../data/courses';

@Component({
  imports: [],
  selector: 'ind-course-item-signals',
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
  `,
  template: `
    <h2>{{ course().title }}</h2>
    <p>{{ course().description }}</p>
    <p>{{ plainText }}</p>
  `,
})
export class CourseItemSignals {
  protected readonly course = signal(getCourses()[0]);
  protected  plainText = "Texto ejemplo"

  constructor() {
    console.log('Constructor: CourseItemSignals');
    setTimeout(() => {

      this.plainText = "Texto cambiado después de 2 segundos";
      console.log(this.plainText)

    }, 2000);

    setTimeout(() => {
      this.course.update((current) => {

        return {
          ...current,
          title: 'Curso de Angular 22 (actualizado)',
        };
    });
      console.log('Course changed to:', this.course());
    }, 4000);
  }
}
