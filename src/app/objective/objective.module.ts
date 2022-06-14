import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ObjectiveComponent } from './objective.component';
import { ObjectiveService } from './objective.service';



@NgModule({
  declarations: [
    ObjectiveComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ObjectiveService
  ]
})
export class ObjectiveModule { }
