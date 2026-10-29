import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  { path: 'login', 
    loadComponent: () => import('../pages/login-page'), 
    title: 'Login | Demo 02' },
  {
    path: 'register',
    loadComponent: () => import('../pages/register-page'),
    title: 'Registro | Demo 02',
  },
];
