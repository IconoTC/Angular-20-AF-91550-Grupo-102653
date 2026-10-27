import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CourseItem } from '../../../features/courses/components/course-item/course-item';
import { CourseItemSignals } from '../../../features/courses/components/course-item-signals/course-item-signals';
import { CourseDetails } from '../../../features/courses/components/course-details/course-details';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  imports: [RouterOutlet, Header, Footer, CourseItem, CourseItemSignals, CourseDetails],
  selector: 'ind-root',
  styles: `
   :host {
      display: grid;
      grid-template-rows: auto 1fr auto;
      min-height: 100vh;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    main.container {
      padding: 1rem 2rem;
      width: 100%;
      min-height: 90%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      position: relative;
    }
  `,
  template: `
    <ind-header />
    <main class="container">
      <ind-course-item />
      <details>
        <summary>Otros ejemplos de Course Item</summary>
        <p>Ejemplo de componente con signals:</p>
        <ind-course-item-signals />
        <ind-course-details />
      </details>
      <router-outlet />
    </main>
    <ind-footer />
  `,
})
export class App {
  // private readonly title = signal('Demo 01');
}
