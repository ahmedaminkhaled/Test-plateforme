import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'test-cases',
    pathMatch: 'full'
  },
  {
    path: 'test-cases',
    loadComponent: () =>
      import('./pages/test-cases/test-cases.component').then((m) => m.TestCasesComponent)
  },
  {
    path: 'requirements',
    loadComponent: () =>
      import('./pages/requirements/requirements.component').then((m) => m.RequirementsComponent)
  },
  {
    path: 'runs',
    loadComponent: () =>
      import('./pages/runs/runs.component').then((m) => m.RunsComponent)
  },
  {
    path: 'reports',
    redirectTo: 'runs'
  },
  {
    path: 'health',
    loadComponent: () =>
      import('./pages/health/health.component').then((m) => m.HealthComponent)
  },
  {
    path: 'settings',
    redirectTo: 'health'
  },
  {
    path: 'knowledge-base',
    redirectTo: 'requirements'
  },
  {
    path: '**',
    redirectTo: 'test-cases'
  }
];
