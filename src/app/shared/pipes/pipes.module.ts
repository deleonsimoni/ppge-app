import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';



@NgModule({
  declarations: [
    SanitizeHtmlPipe
  ],
  exports: [
    SanitizeHtmlPipe
  ]

})
export class PipesModule { }
