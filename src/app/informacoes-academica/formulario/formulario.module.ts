import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormularioRoutingModule } from './formulario-routing.module';
import { FormularioComponent } from './formulario.component';

@NgModule({
    imports: [FormularioRoutingModule, CommonModule, BrowserModule],
    declarations: [FormularioComponent],
    })
export class FormularioModule {}