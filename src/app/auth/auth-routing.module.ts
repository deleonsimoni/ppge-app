import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },

    ],
  },
];

export const AuthRoutingModule = RouterModule.forChild(routes);
