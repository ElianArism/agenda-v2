import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/agenda',
    pathMatch: 'full',
  },
  {
    path: 'agenda',
    loadChildren: () =>
      import('./features/contacts/contacts.routes').then(
        (r) => r.CONTACT_ROUTES
      ),
  },
  {
    path: '**',
    redirectTo: '/contacts',
  },
];
