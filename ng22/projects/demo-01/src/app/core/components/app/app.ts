import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CourseItem } from '../../../features/courses/components/course-item/course-item';

@Component({
  imports: [RouterOutlet, CourseItem],
  selector: 'ind-root',
  styles: [],
  template: `
    <h1>Hola, {{ title() }}</h1>
    <p>Ejemplo de proyecto Angular 22 con TypeScript 6</p>
    <ind-course-item />
    <router-outlet />
  `,
})
export class App {
  protected readonly title = signal('Demo 01');
}
