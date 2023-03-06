import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatoComponent } from './contato/contato.component';
import { CorpoDocenteComponent } from './corpo-docente/corpo-docente.component';
import { NormaPosGraduacaoComponent } from './corpo-docente/normas-pos-graduacao/normas-pos-graduacao.component';
import { DummyComponent } from './dummy/dummy.component';
import { HistoricComponent } from './historic/historic.component';
import { HomeComponent } from './home/home.component';
import { CalendarioComponent } from './informacoes-academica/calendario/calendario.component';
import { FormularioComponent } from './informacoes-academica/formulario/formulario.component';
import { HorarioPeriodoComponent } from './informacoes-academica/horario-periodo/horario-periodo.component';
import { MatriculaComponent } from './informacoes-academica/matricula/matricula.component';
import { ObjectiveComponent } from './objective/objective.component';
import { ProcessoSeletivoComponent } from './processo-seletivo/processo-seletivo.component';
import { TeseDissertacaoComponent } from './tese-dissertacao/tese-dissertacao.component';
import { UserAreaComponent } from './user-area/user-area.component';
import { AuthGuard } from './shared/guards';
import { ResetSenhaComponent } from './reset-senha/reset-senha.component';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
    path: 'processo-seletivo',
    component: ProcessoSeletivoComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'norma-pos-graduacao',
    component: NormaPosGraduacaoComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'area-usuario',
    component: UserAreaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reset-senha',
    component: ResetSenhaComponent
  },
  {
    path: 'esqueci-senha',
    component: EsqueciSenhaComponent
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
  {
    path: 'processo-seletivo',
    loadChildren: () => import('./processo-seletivo/processo-seletivo.module').then(m => m.ProcessoSeletivoModule),
  },
  {
    path: 'norma-pos-graduacao',
    loadChildren: () => import('./corpo-docente/normas-pos-graduacao/normas-pos-graduacao.module').then(m => m.NormaPosGraduacaoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
