import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'ind-login-page',
  styleUrls: ['../../page.css'],
  styles: ``,
  template: `
    <h2>{{ title() }}</h2>
    <p>Si no tiene cuenta, puede registrarse <a [routerLink]="['/auth', 'register']">aquí</a>.</p>
    `,
})
export default class LoginPage {
  protected readonly title = signal('Login');
}
