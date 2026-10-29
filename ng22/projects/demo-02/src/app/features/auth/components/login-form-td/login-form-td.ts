import { JsonPipe } from '@angular/common';
import { Component, DestroyRef, effect, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginRequest } from '../../types/login';
import { Auth } from '../../services/auth';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule, JsonPipe],
  selector: 'ind-login-form-td',
  styles: `
  form { display: flex; flex-direction: column; gap: 1rem; width: 80vw;
  max-width: 400px; .form-control { display: flex; flex-direction: column; gap:
  0.5rem; &.checkbox { flex-direction: row; align-items: center; } } } input,
  textarea { padding: 0.5rem; font-size: 1rem; color: var(--color-primary-hot);
  background-color: var(--color-background-primary); border: none;
  border-block-end: 2px solid var(--color-primary); border-radius: 4px;
  &:focus-visible { outline: var(--color-primary) auto 1px; background-color:
  var(--color-background); } } button { padding: 0.5rem 1rem; font-size: 1rem;
  color: var(--color-background); background-color: var(--color-primary);
  border: none; border-radius: 4px; cursor: pointer; &:disabled {
  background-color: color-mix(in srgb, var(--color-primary) 30%, transparent);
  cursor: not-allowed; } } .error { color: var(--color-tertiary); font-size:
  0.8rem; }`,
  template: `
    <form #form #loginForm="ngForm" (ngSubmit)="login(loginForm)">
      <label for="email" class="form-control">
        <span>Email:</span>
        <input type="email" id="email" name="email" required email ngModel/>
      </label>
      @if (loginForm?.controls['email']?.invalid && loginForm?.controls['email']?.touched) {

        @if (loginForm?.controls['email']?.errors?.['required']) {
          <div class="error">El Email es obligatorio</div>
        } @else if (loginForm?.controls['email']?.errors?.['email']) {
          <div class="error">El Email no es válido</div>
        }
      }
      

      <label for="password" class="form-control">
        <span>Password:</span>
        <input type="password" id="password" name="password" required minlength="5" ngModel/>
      </label>
      @if (loginForm?.controls['password']?.invalid && loginForm?.controls['password']?.touched) {
        @if (loginForm?.controls['password']?.errors?.['required']) {
          <div class="error">La contraseña es obligatoria</div>
        }
        @if (loginForm?.controls['password']?.errors?.['minlength']) {
          <div class="error">La contraseña debe tener al menos 5 caracteres</div>
        }
      }
      <label for="remember" class="form-control checkbox">
        <input type="checkbox" id="remember" name="rememberMe" [ngModel]="false"/>
        <span>Remember me</span>
      </label>

      <button type="submit" [disabled]="loginForm.invalid">Login</button>
    </form>
    <pre>
      {{loginForm.value | json}}
    </pre>
  `,
})
export class LoginFormTd {

  // protected readonly form = viewChild<ElementRef<HTMLFormElement>>('form')
  protected readonly loginForm = viewChild<NgForm>('loginForm')

  readonly #auth = inject(Auth)
  readonly #destroyRef = inject(DestroyRef)
  readonly #router = inject(Router)

  readonly #initialData: LoginRequest = {
    email: '',
    password: '',
    rememberMe: false,
  }

  constructor() {

    effect(() => {
      // console.log('Form:', this.form());
      console.log('NgForm:', this.loginForm());
    })

  }

  login(loginForm: NgForm) {


    if(loginForm.invalid){
      console.log('Invalid form')
      return
    }

    console.log('Login form values:', loginForm.value);
    this.#auth.login(loginForm.value, {
      success: true
    }).pipe(
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe({
      next: (response) => {


        if(response.error) {
          console.log('Login error:', response)
        } else {
          console.log('Login successful:', response)
        }

        loginForm.resetForm(this.#initialData);
        this.#router.navigate(['/auth', 'login', 'info'], {
          state: response 
        });
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }

}
