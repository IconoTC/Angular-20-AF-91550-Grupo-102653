import { Service } from '@angular/core';
import { LoginRequest, LoginResponse } from '../types/login';
import { delay, firstValueFrom, Observable, of } from 'rxjs';

interface LoginOptions {
  delayTime?: number;
  success?: boolean;
}

const DEFAULT_AUTH_OPTIONS: LoginOptions = {
  success: true,
  delayTime: 1000,
};

@Service()
export class Auth {
  #generateToken(): string {
    // Generamos un token aleatorio simulado
    // (en un caso real, esto lo haría el backend)
    return Math.random().toString(36).substring(2);
  }

  #generateId(): number {
    // Generamos un id aleatorio simulado
    // (en un caso real, esto lo haría el backend)
    return Math.floor(Math.random() * 1000);
  }

  login(data: LoginRequest, options: LoginOptions = {}): Observable<LoginResponse> {
    // Simulate a login request
    const finalOptions: LoginOptions = { ...DEFAULT_AUTH_OPTIONS, ...options };

    let result: LoginResponse;

    if (!finalOptions.success) {
      // Simulate a failed login response
      result = {
        error: 'Invalid credentials',
        token: '',
      };
    } else {
      result = {
        // Simulate a successful login response
        error: '',
        token: this.#generateToken(),
        info: {
          id: this.#generateId(),
          email: data.email,
          loginDate: new Date(),
          rememberMe: data.rememberMe,
        },
      };
    }

    return of(result).pipe(delay(finalOptions.delayTime as number));
  }

  loginPromise(data: LoginRequest, options: LoginOptions = {}): Promise<LoginResponse> {
    return firstValueFrom(this.login(data, options));
  }
}
