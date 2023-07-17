import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HorarioPeriodoRoutingModule } from "./horario-periodo-routing.module";
import { HorarioPeriodoComponent } from "./horario-periodo.component";
import { SanitizeModule } from "@app/shared/pipes/sanitize/sanitize.module";

@NgModule({
    imports: [HorarioPeriodoRoutingModule, CommonModule, BrowserModule, SanitizeModule,],
    declarations: [HorarioPeriodoComponent],
    })
export class HorarioPeriodoModule {}