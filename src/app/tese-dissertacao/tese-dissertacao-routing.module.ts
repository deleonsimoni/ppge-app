import { RouterModule, Routes } from '@angular/router';
import { TeseDissertacaoComponent } from './tese-dissertacao.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: '/tese-dissertacao',
                pathMatch: 'full',
            },
            {
                path: 'tese-dissertacao',
                component: TeseDissertacaoComponent,
            },
        ],
    },
];

export const TeseDissertacaoRoutingModule = RouterModule.forChild(routes);