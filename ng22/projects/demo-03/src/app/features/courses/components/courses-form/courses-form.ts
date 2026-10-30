import { Component, inject, output } from '@angular/core';
import { Course } from '../../types/course';
import { StoreCourses } from '../../services/store-courses';

@Component({
  imports: [],
  selector: 'ind-courses-form',
  styles: ``,
  template: `
    <p>Aquí ira el formulario!</p>
    <p>.....</p>
    <p>.....</p>
    <p>.....</p>
    <p>.....</p>
    <p>.....</p>

    <button (click)="sendAdd()">Añadir curso</button>
  `,
})
export class CoursesForm {
  #initialCourse: Omit<Course, 'id'> = {
    title: 'Docker',
    description: 'Descripción del curso',
    image: 'https://via.placeholder.com/150',
    isOfficial: false,
    duration: '5h',
    level: 'beginner',
    courseStats: {
      actualization: 5,
      difficulty: 3,
      utility: 4,
    },
  };

   readonly store = inject(StoreCourses);

  protected readonly addEvent = output<void>();


  sendAdd() {
    this.store.addCourses(this.#initialCourse);
    this.addEvent.emit();
   }
}
