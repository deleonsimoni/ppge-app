import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxFlagPickerModule } from 'ngx-flag-picker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommitteeModule } from './committee/committee.module';
import { ContatoComponent } from './contato/contato.component';
import { CorpoDocenteComponent } from './corpo-docente/corpo-docente.component';
import { CoursesModule } from './courses/courses.module';
import { DummyComponent } from './dummy/dummy.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CalendarioModule } from './informacoes-academica/calendario/calendario.module';
import { FormularioModule } from './informacoes-academica/formulario/formulario.module';
import { HorarioPeriodoModule } from './informacoes-academica/horario-periodo/horario-periodo.module';
import { MatriculaModule } from './informacoes-academica/matricula/matricula.module';
import { AuthHeaderInterceptor } from './interceptors/header.interceptor';
import { CatchErrorInterceptor } from './interceptors/http-error.interceptor';
import { RegulationModule } from './regulation/regulation.module';
import { ResearchLineModule } from './research-line/research-line.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AuthService } from './shared/services';
import { SharedModule } from './shared/shared.module';
import { TeseDissertacaoModule } from './tese-dissertacao/tese-dissertacao.module';
import { ToastrModule } from 'ngx-toastr';
import { ModalTermoUsoComponent } from './modals/modal-termo-uso/modal-termo-uso.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

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
    CommitteeModule,
    ScheduleModule,
    RegulationModule,
    ResearchLineModule,
    CoursesModule,
    CommonModule,
    AngularEditorModule,
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [AppComponent, HeaderComponent, HomeComponent, CorpoDocenteComponent, FooterComponent, ContatoComponent, DummyComponent, ModalTermoUsoComponent],
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
