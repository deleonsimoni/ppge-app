import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BreakStringPipe } from "./break-string,pipe";

@NgModule({
    declarations: [
        BreakStringPipe
    ],
    imports: [
      CommonModule
    ],
    exports: [
        BreakStringPipe
    ]
  })
  export class BreakStringModule { }