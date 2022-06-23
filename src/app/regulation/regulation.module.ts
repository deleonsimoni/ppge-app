import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RegulationRountingModule } from './regulation-routing.module';
import { RegulationComponent } from './regulation.component';



@NgModule({
  declarations: [
    RegulationComponent
  ],
  imports: [
    RegulationRountingModule,
    CommonModule
  ]
})
export class RegulationModule { }
