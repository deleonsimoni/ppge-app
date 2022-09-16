import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OnlyAdminUsersGuard } from './admin-user-guard';
import { AdminComponent } from './admin.component';
import { CorpoDocenteComponent } from './corpo-docente/corpo-docente.component';
import { PagesAdminComponent } from './pages-admin/pages-admin.component';
import { ProcessoSeletivoAdminComponent } from './processo-seletivo-admin/processo-seletivo-admin.component';
import { TeseDissertacaoAdminComponent } from './tese-dissertacao-admin/tese-dissertacao-admin.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [OnlyAdminUsersGuard],
    component: AdminComponent,
    children: [

      {
        path: "", pathMatch: "full", redirectTo: "administrar-paginas"
      },
      {
        path: 'administrar-paginas', component: PagesAdminComponent
      },
      {
        path: 'corpo-docente', component: CorpoDocenteComponent
      },
      {
        path: 'tese-dissertacao', component: TeseDissertacaoAdminComponent
      },
      {
        path: 'processo-seletivo', component: ProcessoSeletivoAdminComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
