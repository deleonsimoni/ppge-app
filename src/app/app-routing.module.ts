import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/guards';
import { HomeComponent } from './home/home.component';
import { CorpoDocenteComponent } from './corpo-docente/corpo-docente.component';
import { ContatoComponent } from './contato/contato.component';
import { Home2Component } from './home2/home2.component';
import { Home3Component } from './home3/home3.component';
import { DummyComponent } from './dummy/dummy.component';
import { TeseDissertacaoComponent } from './tese-dissertacao/tese-dissertacao.component';
import { MatriculaComponent } from './informacoes-academica/matricula/matricula.component';
import { FormularioComponent } from './informacoes-academica/formulario/formulario.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'home2',
    component: Home2Component,
    //canActivate: [AuthGuard],
  },
  {
    path: 'home3',
    component: Home3Component,
    //canActivate: [AuthGuard],
  },
  {
    path: 'dummy',
    component: DummyComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'corpo-docente/:tipo',
    component: CorpoDocenteComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'contato',
    component: ContatoComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'tese-dissertacao',
    component: TeseDissertacaoComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'matricula',
    component: MatriculaComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'formulario',
    component: FormularioComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'tese-dissertacao',
    loadChildren: () => import('./tese-dissertacao/tese-dissertacao.module').then(m => m.TeseDissertacaoModule),
  },
  {
    path: 'matricula',
    loadChildren: () => import('./informacoes-academica/matricula/matricula.module').then(m => m.MatriculaModule),
  },
  {
    path: 'formulario',
    loadChildren: () => import('./informacoes-academica/formulario/formulario.module').then(m => m.FormularioModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
