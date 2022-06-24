import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatoComponent } from './contato/contato.component';
import { CorpoDocenteComponent } from './corpo-docente/corpo-docente.component';
import { DummyComponent } from './dummy/dummy.component';
import { HistoricComponent } from './historic/historic.component';
import { HomeComponent } from './home/home.component';
import { Home2Component } from './home2/home2.component';
import { Home3Component } from './home3/home3.component';
import { CalendarioComponent } from './informacoes-academica/calendario/calendario.component';
import { FormularioComponent } from './informacoes-academica/formulario/formulario.component';
import { HorarioPeriodoComponent } from './informacoes-academica/horario-periodo/horario-periodo.component';
import { MatriculaComponent } from './informacoes-academica/matricula/matricula.component';
import { ObjectiveComponent } from './objective/objective.component';
import { TeseDissertacaoComponent } from './tese-dissertacao/tese-dissertacao.component';

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
    path: 'historico',
    component: HistoricComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'objetivo',
    component: ObjectiveComponent,
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
    path: 'calendario',
    component: CalendarioComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'formulario',
    component: FormularioComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'horario-periodo',
    component: HorarioPeriodoComponent,
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
    path: 'calendario',
    loadChildren: () => import('./informacoes-academica/calendario/calendario.module').then(m => m.CalendarioModule),
  },
  {
    path: 'formulario',
    loadChildren: () => import('./informacoes-academica/formulario/formulario.module').then(m => m.FormularioModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'comissoes',
    loadChildren: () => import('./committee/committee.module').then(m => m.CommitteeModule),
  },
  {
    path: 'agenda',
    loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule),
  },
  {
    path: 'regulamentos',
    loadChildren: () => import('./regulation/regulation.module').then(m => m.RegulationModule),
  },
  {
    path: 'linhas-pesquisa',
    loadChildren: () => import('./research-line/research-line.module').then(m => m.ResearchLineModule),
  },
  {
    path: 'cursos',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
  },
  {
    path: 'horario-periodo',
    loadChildren: () => import('./informacoes-academica/horario-periodo/horario-periodo.module').then(m => m.HorarioPeriodoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
