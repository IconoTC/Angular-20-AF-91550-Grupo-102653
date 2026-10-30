import { JsonPipe } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../types/login';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [ReactiveFormsModule, JsonPipe],
  selector: 'ind-login-form-md-rx',
  styles: `
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 80vw;
      max-width: 400px;
      .form-control {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        &.checkbox {
          flex-direction: row;
          align-items: center;
        }
      }
    }
    input,
    textarea {
      padding: 0.5rem;
      font-size: 1rem;
      color: var(--color-primary-hot);
      background-color: var(--color-background-primary);
      border: none;
      border-block-end: 2px solid var(--color-primary);
      border-radius: 4px;
      &:focus-visible {
        outline: var(--color-primary) auto 1px;
        background-color: var(--color-background);
      }
    }
    button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      color: var(--color-background);
      background-color: var(--color-primary);
      border: none;
      border-radius: 4px;
      cursor: pointer;
      &:disabled {
        background-color: color-mix(in srgb, var(--color-primary) 30%, transparent);
        cursor: not-allowed;
      }
    }
    .error {
      color: var(--color-tertiary);
      font-size: 0.8rem;
    }
  `,
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="login()">
      <label for="email" class="form-control">
        <span>Email:</span>
        <input type="email" id="email" formControlName="email" />
      </label>

      @let email = loginForm?.get('email');
      @if (email?.invalid && email?.touched) {
        @if (email?.errors?.['required']) {
          <div class="error">El Email es obligatorio</div>
        } @else if (email?.errors?.['email']) {
          <div class="error">El Email no es válido</div>
        }
      }

      <label for="password" class="form-control">
        <span>Password:</span>
        <input type="password" id="password" formControlName="password" />
      </label>

      @let password = loginForm?.get('password');
      @if (password?.invalid && password?.touched) {
        @if (password?.errors?.['required']) {
          <div class="error">La contraseña es obligatoria</div>
        }
        @if (password?.errors?.['minlength']) {
          <div class="error">La contraseña debe tener al menos 5 caracteres</div>
        }
      }

      <label for="remember" class="form-control checkbox">
        <input type="checkbox" id="remember" formControlName="rememberMe" />
        <span>Remember me</span>
      </label>

      <button type="submit" [disabled]="loginForm.invalid">Login</button>
    </form>
    <pre>
      {{ loginForm.value | json }}
    </pre>
  `,
})
export class LoginFormMdRx {
  readonly #fb = inject(FormBuilder);

  readonly #auth = inject(Auth);
  readonly #destroyRef = inject(DestroyRef);
  readonly #router = inject(Router);

  readonly #initialData: LoginRequest = {
    email: '',
    password: '',
    rememberMe: false,
  };

  // protected readonly loginForm = new FormGroup({
  //   email: new FormControl('', []),
  //   password: new FormControl('', []),
  //   rememberMe: new FormControl(false),
  // });

  protected readonly loginForm: FormGroup = this.#fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    rememberMe: [false],
  });

  login() {
    if (this.loginForm.invalid) {
      console.log('Invalid form');
      return;
    }

    console.log(this.loginForm.value);

     this.#auth.login(this.loginForm.value, {
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

        this.loginForm.reset(this.#initialData);
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
