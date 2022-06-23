import { RouterModule, Routes } from '@angular/router';
import { MatriculaComponent } from './matricula.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: '/matricula',
                pathMatch: 'full',
            },
            {
                path: 'matricula',
                component: MatriculaComponent,
            },
        ],
    },
];

export const MatriculaRoutingModule = RouterModule.forChild(routes);