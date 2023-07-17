import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatriculaRoutingModule } from './matricula-routing.module';
import { MatriculaComponent } from './matricula.component';
import { SanitizeModule } from '@app/shared/pipes/sanitize/sanitize.module';

@NgModule({
    imports: [MatriculaRoutingModule, CommonModule, BrowserModule, SanitizeModule,],
    declarations: [MatriculaComponent],
    })
export class MatriculaModule {}