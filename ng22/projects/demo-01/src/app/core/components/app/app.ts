import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CourseItem } from '../../../features/courses/components/course-item/course-item';
import { CourseItemSignals } from '../../../features/courses/components/course-item-signals/course-item-signals';

@Component({
  imports: [RouterOutlet, CourseItem, CourseItemSignals],
  selector: 'ind-root',
  styles: [],
  template: `
    <h1>Hola, {{ title() }}</h1>
    <p>Ejemplo de proyecto Angular 22 con TypeScript 6</p>
    <ind-course-item />
    <details>
      <summary>Otros ejemplos de Course Item</summary>
      <p>Ejemplo de componente con signals:</p>
      <ind-course-item-signals />
    
    </details>
    <router-outlet />
  `,
})
export class App {
  private readonly title = signal('Demo 01');
}
