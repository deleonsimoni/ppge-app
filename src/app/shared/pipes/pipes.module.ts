import { NgModule } from '@angular/core';
import { ImagePathComplementPipe } from './image-path/image-path-complement.pipe';

import { SanitizeHtmlPipe } from './sanitize-html.pipe';
import { CpfRgPipePipe } from './cpf-rg-pipe.pipe';
import { TelefonePipePipe } from './telefone-pipe.pipe';



@NgModule({
  declarations: [
    SanitizeHtmlPipe,
    ImagePathComplementPipe,
    CpfRgPipePipe,
    TelefonePipePipe
  ],
  exports: [
    SanitizeHtmlPipe,
    ImagePathComplementPipe,
    CpfRgPipePipe,
    TelefonePipePipe
  ]

})
export class PipesModule { }
