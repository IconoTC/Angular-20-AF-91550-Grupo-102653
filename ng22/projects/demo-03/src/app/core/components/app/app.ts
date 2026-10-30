import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Card } from '../../design/card/card';
import { LogoCoders } from '../logo-coders/logo-coders';
import { Menu } from '../../design/menu/menu';
import { MenuOption } from '../../types/menu-option';
import { MENU_OPTIONS } from '../../../app.routes';
import { StoreCourses } from '../../../features/courses/services/store-courses';

@Component({
  imports: [RouterOutlet, Header, Footer, Card, LogoCoders, Menu],
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
    <ind-header [app-title]="title()" [subtitle]="subtitle()">
      <ind-logo-coders slot="logo" />
      <ind-menu [menuOptions]="menuOptions()" slot="menu" />
    </ind-header>
    <main class="container">
      <ind-card>
        <router-outlet />
        <!-- Aquí van las páginas de la aplicación -->
      </ind-card>
    </main>
    <ind-footer />
  `,
})
export class App {
  readonly storeCourses = inject(StoreCourses);

  private readonly title = signal('Demo 03');
  private readonly subtitle = signal('Aprendiendo Angular 22');

  protected readonly menuOptions = signal<MenuOption[]>(MENU_OPTIONS);

  constructor() {
    this.storeCourses.loadCourses();
  }
}
