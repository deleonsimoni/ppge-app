import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HistoricComponent } from './historic.component';
import { HistoricService } from './historic.service';



@NgModule({
  declarations: [
    HistoricComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    HistoricService
  ]
})
export class HistoricModule { }
