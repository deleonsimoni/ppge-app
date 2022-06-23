import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatriculaRoutingModule } from './matricula-routing.module';
import { MatriculaComponent } from './matricula.component';

@NgModule({
    imports: [MatriculaRoutingModule, CommonModule, BrowserModule],
    declarations: [MatriculaComponent],
    })
export class MatriculaModule {}