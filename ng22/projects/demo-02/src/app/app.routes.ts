import { Routes } from '@angular/router';
import { MenuOption } from './core/types/menu-option';
import { TimeService } from './core/services/time.service';
import { authRoutes } from './features/auth/routes/auth.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // { path: 'home', component: HomePage, title: 'Inicio | Demo 02', data: {label: 'Inicio'  } },
  // { path: 'dashboard', component: DashboardPage, title: 'Dashboard | Demo 02', data: {label: 'Dashboard' } },
  // { path: 'courses', component: CoursesPage, title: 'Cursos | Demo 02', data: {label: 'Cursos' } },
  // { path: 'about', component: AboutPage, title: 'Acerca de | Demo 02', data: {label: 'Acerca de' } },

  {
    path: 'home',
    loadComponent: () => import('./features/home/home-page'),
    title: 'Inicio | Demo 02',
    data: { label: 'Inicio' },
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard-page'),
    title: 'Dashboard | Demo 02',
    data: { label: 'Dashboard' },
    providers: [
      TimeService
    ]
  },
  {
    path: 'courses',
    loadComponent: () => import('./features/courses/courses-page'),
    title: 'Cursos | Demo 02',
    data: { label: 'Cursos' },
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about-page'),
    title: 'Acerca de | Demo 02',
    data: { label: 'Acerca de' },
  },

  {
    path: 'auth',
    //loadChildren: () => import('./features/auth/auth-page'),
    children: authRoutes
  },
  { path: '**', redirectTo: 'home' },
];

export const MENU_OPTIONS: MenuOption[] = routes
  .filter((route) => route.data?.['label'])
  .map((route) => ({
    label: route.data!['label'] as string,
    path: route.path!,
  }));
