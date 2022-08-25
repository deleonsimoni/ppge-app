import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SanitizeModule } from '@app/shared/pipes/sanitize/sanitize.module';
import { HistoricComponent } from './historic.component';
import { HistoricService } from './historic.service';


@NgModule({
  declarations: [
    HistoricComponent
  ],
  imports: [
    CommonModule,
    SanitizeModule,
  ],
  providers: [
    HistoricService
  ]
})
export class HistoricModule { }
