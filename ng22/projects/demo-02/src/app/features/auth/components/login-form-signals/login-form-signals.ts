import { Component, inject, signal } from '@angular/core';
import { LoginRequest } from '../../types/login';
import {
  email,
  form,
  FormField,
  FormRoot,
  minLength,
  PathKind,
  required,
  SchemaPathTree,
} from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { Input } from '../../../../core/design/input/input';

@Component({
  imports: [FormField, FormRoot, JsonPipe, Input],
  selector: 'ind-login-form-signals',
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
    <form [formRoot]="loginFieldTree">

      <!-- <label for="email" class="form-control">
        <span>Email:</span>
        <input type="email" id="email" [formField]="loginFieldTree.email" />
      </label>
      @if (loginFieldTree.email()?.invalid() && loginFieldTree.email()?.touched()) {
        <p class="error">{{ loginFieldTree.email().errors()[0]?.message }}</p>
      } -->

      <ind-input 
        type="email"
        label="Email" 
        [formField]="loginFieldTree.email" />


      <label for="password" class="form-control">
        <span>Password:</span>
        <input type="password" id="password" [formField]="loginFieldTree.password" />
      </label>
      @if (loginFieldTree.password()?.invalid() && loginFieldTree.password()?.touched()) {
        <p class="error">{{ loginFieldTree.password().errors()[0]?.message }}</p>
      }

      <label for="remember" class="form-control checkbox">
        <input type="checkbox" id="remember" [formField]="loginFieldTree.rememberMe" />
        <span>Remember me</span>
      </label>

      <button type="submit" [disabled]="loginFieldTree().invalid()">Login</button>
    </form>
    <pre>
      {{ loginFieldTree().value() | json }}
    </pre>
  `,
})
export class LoginFormSignals {
  readonly #auth = inject(Auth);
  readonly #router = inject(Router);

  readonly #initialData: LoginRequest = {
    email: '',
    password: '',
    rememberMe: false,
  };

  readonly #loginModel = signal<LoginRequest>(this.#initialData);

  //

  readonly #schema = (path: SchemaPathTree<LoginRequest, PathKind.Root>) => {
    required(path.email, {
      message: 'El Email es obligatorio',
    });
    email(path.email, { message: 'El Email no es válido' });
    required(path.password, { message: 'La contraseña es obligatoria' });
    minLength(path.password, 5, { message: 'La contraseña debe tener al menos 5 caracteres' });
  };

  readonly loginFieldTree = form(this.#loginModel, this.#schema.bind(this), {
    submission: {
      action: this.login.bind(this),
    },
  });

  async login() {
    if (this.loginFieldTree().invalid()) {
      console.log('Invalid form');
      return;
    }

    console.log('Login', this.loginFieldTree().value());

    try {
      const response = await this.#auth.loginPromise(this.loginFieldTree().value(), {
        success: true,
      });

      if (response.error) {
        console.log('Login error:', response);
      } else {
        console.log('Login successful:', response);
      }

      this.loginFieldTree().reset(this.#initialData);
      this.#router.navigate(['/auth', 'login', 'info'], {
        state: response,
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  }
}
