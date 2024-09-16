import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefonePipe'
})
export class TelefonePipePipe implements PipeTransform {

  transform(value: String, ...args: unknown[]): unknown {
    if (!value) return '';
    if (value.length > 10) {
      return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else {
      return value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
  }

}
