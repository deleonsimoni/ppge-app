import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxFlagPickerModule } from 'ngx-flag-picker';
import { ToastrModule } from 'ngx-toastr';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommitteeModule } from './committee/committee.module';
import { ContatoComponent } from './contato/contato.component';
import { CorpoDocenteComponent } from './corpo-docente/corpo-docente.component';
import { CoursesModule } from './courses/courses.module';
import { DummyComponent } from './dummy/dummy.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HistoricModule } from './historic/historic.module';
import { HomeComponent } from './home/home.component';
import { CalendarioModule } from './informacoes-academica/calendario/calendario.module';
import { FormularioModule } from './informacoes-academica/formulario/formulario.module';
import { HorarioPeriodoModule } from './informacoes-academica/horario-periodo/horario-periodo.module';
import { MatriculaModule } from './informacoes-academica/matricula/matricula.module';
import { AuthHeaderInterceptor } from './interceptors/header.interceptor';
import { CatchErrorInterceptor } from './interceptors/http-error.interceptor';
import { ModalTermoUsoComponent } from './modals/modal-termo-uso/modal-termo-uso.component';
import { ProcessoSeletivoModule } from './processo-seletivo/processo-seletivo.module';
import { RegulationModule } from './regulation/regulation.module';
import { ResearchLineModule } from './research-line/research-line.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ComponentsModule } from './shared/components/components.module';
import { ImagePathComplementPipe } from './shared/pipes/image-path/image-path-complement.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './shared/services';
import { SharedModule } from './shared/shared.module';
import { TeseDissertacaoModule } from './tese-dissertacao/tese-dissertacao.module';
import { UserAreaModule } from './user-area/user-area.module';
import { ResetSenhaComponent } from './reset-senha/reset-senha.component';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';

export function appInitializerFactory(authService: AuthService) {
  return () => authService.checkTheUserOnTheFirstLoad();
}

export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    TeseDissertacaoModule,
    MatriculaModule,
    CalendarioModule,
    HorarioPeriodoModule,
    FormularioModule,
    NgxFlagPickerModule,
    ToastrModule.forRoot(),
    ComponentsModule,
    CommitteeModule,
    ScheduleModule,
    RegulationModule,
    ResearchLineModule,
    CoursesModule,
    CommonModule,
    AngularEditorModule,
    BrowserModule,
    ProcessoSeletivoModule,
    UserAreaModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HistoricModule,
    NgbModule

  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CorpoDocenteComponent,
    FooterComponent,
    ContatoComponent,
    DummyComponent,
    ModalTermoUsoComponent,
    ResetSenhaComponent,
    EsqueciSenhaComponent,

  ],
  exports: [
    ImagePathComplementPipe
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CatchErrorInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      multi: true,
      deps: [AuthService],
    },

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
