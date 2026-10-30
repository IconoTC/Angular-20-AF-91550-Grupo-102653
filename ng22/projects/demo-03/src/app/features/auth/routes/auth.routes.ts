import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  { path: 'login', redirectTo: 'login/td', pathMatch: 'full' },
  {
    path: 'login/:formType',
    loadComponent: () => import('../pages/login-page'),
    title: 'Login | Demo 03',
  },
  {
    path: 'register',
    loadComponent: () => import('../pages/register-page'),
    title: 'Registro | Demo 03',
  },
];
