import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CalendarioRoutingModule } from "./calendario-routing.module";
import { CalendarioComponent } from "./calendario.component";
import { SanitizeModule } from "@app/shared/pipes/sanitize/sanitize.module";

@NgModule({
    imports: [CalendarioRoutingModule, CommonModule, BrowserModule, SanitizeModule,],
    declarations: [CalendarioComponent],
    })
export class CalendarioModule {}