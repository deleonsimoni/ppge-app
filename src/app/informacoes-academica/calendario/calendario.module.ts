import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CalendarioRoutingModule } from "./calendario-routing.module";
import { CalendarioComponent } from "./calendario.component";

@NgModule({
    imports: [CalendarioRoutingModule, CommonModule, BrowserModule],
    declarations: [CalendarioComponent],
    })
export class CalendarioModule {}