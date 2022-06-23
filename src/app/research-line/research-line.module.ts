import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ResearchLineRountingModule } from './research-line-routing.module';
import { ResearchLineComponent } from './research-line.component';



@NgModule({
  declarations: [
    ResearchLineComponent
  ],
  imports: [
    ResearchLineRountingModule,
    CommonModule
  ]
})
export class ResearchLineModule { }
