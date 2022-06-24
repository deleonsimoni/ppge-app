import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HorarioPeriodoRoutingModule } from "./horario-periodo-routing.module";
import { HorarioPeriodoComponent } from "./horario-periodo.component";

@NgModule({
    imports: [HorarioPeriodoRoutingModule, CommonModule, BrowserModule],
    declarations: [HorarioPeriodoComponent],
    })
export class HorarioPeriodoModule {}