import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuOption } from '../../../core/types/menu-option';
import { Menu } from '../../../core/design/menu/menu';
import { Card } from '../../../core/design/card/card';
import { LoginFormMdRx } from '../components/login-form-md-rx/login-form-md-rx';
import { LoginFormTd } from '../components/login-form-td/login-form-td';
import { LoginFormSignals } from '../components/login-form-signals/login-form-signals';

type FormType = 'td' | 'md-rx' | 'signal';

@Component({
  imports: [RouterLink, Menu, Card, LoginFormTd, LoginFormMdRx, LoginFormSignals],
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
      }
    </ind-card>

    <p>Si no tiene cuenta, puede registrarse <a [routerLink]="['/auth', 'register']">aquí</a>.</p>
  `,
})
export default class LoginPage {
  // protected readonly activatedRoute = inject(ActivatedRoute);
  // protected readonly destroyRef = inject(DestroyRef);

  protected readonly formType = input.required<FormType>();

  protected readonly title = signal('Login');

  protected menuOptions = signal<MenuOption[]>([
    { label: 'Template Driven Forms', path: '../td' },
    { label: 'Reactive Forms', path: '../md-rx' },
    { label: 'Signals', path: '../signal' },
  ]);

  // protected subscriptions: Subscription

  // constructor() {
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
  // });
}

// ngOnDestroy(): void {
//   this.subscriptions.unsubscribe();
// }
//}
