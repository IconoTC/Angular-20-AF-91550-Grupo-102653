import { Component, inject, input, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { MenuOption } from '../../../core/types/menu-option';
import { Menu } from '../../../core/design/menu/menu';
import { Card } from '../../../core/design/card/card';
import { LoginFormMdRx } from '../components/login-form-md-rx/login-form-md-rx';
import { LoginFormTd } from '../components/login-form-td/login-form-td';
import { LoginFormSignals } from '../components/login-form-signals/login-form-signals';
import { LoginResponse } from '../types/login';
import { JsonPipe } from '@angular/common';

type FormType = 'td' | 'md-rx' | 'signal' | 'info';

@Component({
  imports: [RouterLink, Menu, Card, LoginFormTd, LoginFormMdRx, LoginFormSignals, JsonPipe],
  selector: 'ind-login-page',
  styleUrls: ['../../page.css'],
  styles: ``,
  template: `
    <h2>{{ title() }}</h2>

    <ind-menu [menuOptions]="menuOptions()" />

    <ind-card>
      @if (formType() === 'td') {
        <ind-login-form-td />
      } @else if (formType() === 'md-rx') {
        <ind-login-form-md-rx />
      } @else if (formType() === 'signal') {
        <ind-login-form-signals />
      } @else if (formType() === 'info') {
        <p>{{ navigationState()?.error ? 'Error en el login ' + navigationState()?.error : 'Login exitoso' }}</p>
        <pre>{{ navigationState() | json }}</pre>
      }
    </ind-card>

    <p>Si no tiene cuenta, puede registrarse <a [routerLink]="['/auth', 'register']">aquí</a>.</p>
  `,
})
export default class LoginPage {
  // protected readonly activatedRoute = inject(ActivatedRoute);
  // protected readonly destroyRef = inject(DestroyRef);

  readonly #router = inject(Router);

  protected readonly formType = input.required<FormType>();

  protected readonly title = signal('Login');

  protected readonly navigationState = signal<LoginResponse | null>(null);

  protected menuOptions = signal<MenuOption[]>([
    { label: 'Template Driven Forms', path: '../td' },
    { label: 'Reactive Forms', path: '../md-rx' },
    { label: 'Signals', path: '../signal' },
  ]);

  // protected subscriptions: Subscription

  constructor() {
    // console.log(this.activatedRoute.snapshot.params);

    // this.subscriptions = this.activatedRoute.params.subscribe((params) => {
    //   console.log(params);
    // });

    // this.activatedRoute.params.pipe(
    //   takeUntilDestroyed(this.destroyRef)
    // ).subscribe((params) => {
    //   console.log(params);
    // });

    // effect(() => {
    //   console.log(this.formType());
    //});

    this.#router.events.subscribe((event) => {
      // console.log(event);
      if (event instanceof NavigationEnd) {
        console.log('RouterEvent:', event);
        const currentNav = this.#router.currentNavigation();
        console.log('Current Navigation:', currentNav);
        if (currentNav?.extras.state) {
          console.log('Navigation state:', currentNav.extras.state);
          this.navigationState.set(currentNav.extras.state as LoginResponse);
        }
      }
    });
  }

  // ngOnDestroy(): void {
  //   this.subscriptions.unsubscribe();
  // }
  //}
}
