import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'ind-register-page',
  styleUrls: ['../../page.css'],
  styles: ``,
  template: `
    <h2>{{ title() }}</h2>
    <p>Si ya tiene cuenta, puede iniciar sesión <a [routerLink]="['/auth', 'login']">aquí</a>.</p>
    `,
})
export default class RegisterPage {
  protected readonly title = signal('Registro');
}
