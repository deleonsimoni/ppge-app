import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlyAllowedRolesUsersGuard } from './admin-allowed-roles-guard';

import { AdminComponent } from './admin.component';
import { CorpoDocenteComponent } from './corpo-docente/corpo-docente.component';
import { InscricoesComponent } from './inscricoes/inscricoes.component';
import { PagesAdminComponent } from './pages-admin/pages-admin.component';
import { PareceristasComponent } from './pareceristas/pareceristas.component';
import { ProcessoSeletivoAdminComponent } from './processo-seletivo-admin/processo-seletivo-admin.component';
import { RankComponent } from './rank/rank.component';
import { TeseDissertacaoAdminComponent } from './tese-dissertacao-admin/tese-dissertacao-admin.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [OnlyAllowedRolesUsersGuard],
    data: {
      roles: ['admin', 'parecerista', 'coordenador']
    },
    component: AdminComponent,
    children: [
      {
        path: 'administrar-paginas', component: PagesAdminComponent,
        canActivate: [OnlyAllowedRolesUsersGuard],
        data: {
          roles: ['admin']
        }
      },
      {
        path: 'corpo-docente', component: CorpoDocenteComponent,
        canActivate: [OnlyAllowedRolesUsersGuard],
        data: {
          roles: ['admin']
        }
      },
      {
        path: 'tese-dissertacao', component: TeseDissertacaoAdminComponent,
        canActivate: [OnlyAllowedRolesUsersGuard],
        data: {
          roles: ['admin']
        }
      },
      {
        path: 'processo-seletivo', component: ProcessoSeletivoAdminComponent,
        canActivate: [OnlyAllowedRolesUsersGuard],
        data: {
          roles: ['admin']
        }
      },
      {
        path: 'pareceristas', component: PareceristasComponent,
        canActivate: [OnlyAllowedRolesUsersGuard],
        data: {
          roles: ['admin', 'coordenador']
        }
      },
      {
        path: 'inscritos', component: InscricoesComponent,
        canActivate: [OnlyAllowedRolesUsersGuard],
        data: {
          roles: ['admin', 'coordenador', 'parecerista']
        }
      },
      {
        path: 'rank', component: RankComponent,
        canActivate: [OnlyAllowedRolesUsersGuard],
        data: {
          roles: ['admin', 'coordenador', 'parecerista']
        }
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
