import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormularioRoutingModule } from './formulario-routing.module';
import { FormularioComponent } from './formulario.component';
import { SanitizeModule } from '@app/shared/pipes/sanitize/sanitize.module';

@NgModule({
    imports: [FormularioRoutingModule, CommonModule, BrowserModule, SanitizeModule],
    declarations: [FormularioComponent],
    })
export class FormularioModule {}