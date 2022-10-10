import { NgModule } from '@angular/core';
import { ImagePathComplementPipe } from './image-path/image-path-complement.pipe';

import { SanitizeHtmlPipe } from './sanitize-html.pipe';



@NgModule({
  declarations: [
    SanitizeHtmlPipe,
    ImagePathComplementPipe
  ],
  exports: [
    SanitizeHtmlPipe,
    ImagePathComplementPipe
  ]

})
export class PipesModule { }
