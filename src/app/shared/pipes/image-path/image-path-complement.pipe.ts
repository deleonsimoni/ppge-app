import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagePathComplement'
})
export class ImagePathComplementPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value == "string") {
      return 'https://ppge-public.s3.sa-east-1.amazonaws.com/'.concat(value)
    }
  }

}
