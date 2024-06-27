import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlyAllowedRolesUsersGuard } from './admin-allowed-roles-guard';

import { AdminComponent } from './admin.component';
import { CorpoDocenteComponent } from './corpo-docente/corpo-docente.component';
import { CotaAcaoAfirmativaComponent } from './cota-acao-afirmativa/cota-acao-afirmativa.component';
import { CriterioAvaliacaoComponent } from './criterio-avaliacao/criterio-avaliacao.component';
import { InscricoesComponent } from './inscricoes/inscricoes.component';
import { PagesAdminComponent } from './pages-admin/pages-admin.component';
import { PareceristasComponent } from './pareceristas/pareceristas.component';
import { ProcessoSeletivoAdminComponent } from './processo-seletivo-admin/processo-seletivo-admin.component';
import { RankComponent } from './rank/rank.component';
import { TeseDissertacaoAdminComponent } from './tese-dissertacao-admin/tese-dissertacao-admin.component';
import { GerenciarUsuariosComponent } from './gerenciar-usuarios/gerenciar-usuarios.component';
import { CriterioHomologacaoComponent } from './criterio-homologacao/criterio-homologacao.component';
import { AdministrarHomeComponent } from './administrar-home/administrar-home.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [OnlyAllowedRolesUsersGuard],
    data: {
      roles: ['admin', 'parecerista', 'coordenador', 'gerenciador']
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
          roles: ['admin', 'gerenciador']
        }
      },
      {
        path: 'criterio-avaliacao', component: CriterioAvaliacaoComponent,
        canActivate: [OnlyAllowedRolesUsersGuard],
        data: {
          roles: ['admin', 'gerenciador']
        }
      },
      {
        path: 'criterio-homologacao', component: CriterioHomologacaoComponent,
        canActivate: [OnlyAllowedRolesUsersGuard],
        data: {
          roles: ['admin', 'gerenciador']
        }
      },
      {
        path: 'pareceristas', component: PareceristasComponent,
        canActivate: [OnlyAllowedRolesUsersGuard],
        data: {
          roles: ['admin', 'coordenador', 'gerenciador']
        }
      },
      {
        path: 'inscritos', component: InscricoesComponent,
        canActivate: [OnlyAllowedRolesUsersGuard],
        data: {
          roles: ['admin', 'coordenador', 'parecerista', 'gerenciador']
        }
      },
      {
        path: 'rank', component: RankComponent,
        canActivate: [OnlyAllowedRolesUsersGuard],
        data: {
          roles: ['admin', 'coordenador', 'parecerista', 'gerenciador']
        }
      },
      {
        path: 'cotas-acoes-afirmativas', component: CotaAcaoAfirmativaComponent,
        canActivate: [OnlyAllowedRolesUsersGuard],
        data: {
          roles: ['admin', 'gerenciador']
        }
      },
      {
        path: 'gerenciar-usuarios', component: GerenciarUsuariosComponent,
        canActivate: [OnlyAllowedRolesUsersGuard],
        data: {
          roles: ['admin']
        }
      },
      {
        path: 'administrar-home', component: AdministrarHomeComponent,
        canActivate: [OnlyAllowedRolesUsersGuard],
        data: {
          roles: ['admin']
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
