import { TestBed } from '@angular/core/testing';
import { Auth } from './auth';

describe('Auth', () => {
  let service: Auth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loginPromise', () => {
    it('should return a successful login response', () => {
      const loginRequest = {
        email: 'user@example.com',
        password: 'password123',
        rememberMe: true,
      };

      const loginResponse = service.loginPromise(loginRequest);

      return loginResponse.then((response) => {
        expect(response.error).toBe('');
        expect(response.token).not.toBe('');
        expect(response.info).toBeDefined();
      });
    });

    it('should return a successful login response (async)', async () => {
      const loginRequest = {
        email: 'user@example.com',
        password: 'password123',
        rememberMe: true,
      };

      const loginResponse = await service.loginPromise(loginRequest);

      expect(loginResponse.error).toBe('');
      expect(loginResponse.token).not.toBe('');
      expect(loginResponse.info).toBeDefined();
    });

    it('should return a failed login response', () => {
      const loginRequest = {
        email: 'user@example.com',
        password: 'wrongpassword',
        rememberMe: true,
      };

      const loginResponse = service.loginPromise(loginRequest, {
        success: false,
      });

      return loginResponse.then((response) => {
        expect(response.error).not.toBe('');
        expect(response.token).toBe('');
        expect(response.info).not.toBeDefined();
      });
    });
  });

  describe('login', () => {
    it('should return a successful login response', () => {
      const loginRequest = {
        email: 'user@example.com',
        password: 'password123',
        rememberMe: true,
      };

      const loginResponse$ = service.login(loginRequest);

      loginResponse$.subscribe({
        next: (response) => {
          expect(response.error).toBe('');
          expect(response.token).not.toBe('');
          expect(response.info).toBeDefined();
        },
      });
    });

    it('should return a failed login response', () => {
      const loginRequest = {
        email: 'user@example.com',
        password: 'wrongpassword',
        rememberMe: true,
      };

      const loginResponse$ = service.login(loginRequest, {
        success: false,
      });

      loginResponse$.subscribe({
        next: (response) => {
          expect(response.error).not.toBe('');
          expect(response.token).toBe('');
          expect(response.info).not.toBeDefined();
        },
      });
    });
  });
});
