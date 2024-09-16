import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfRgPipe'
})
export class CpfRgPipePipe implements PipeTransform {

  transform(value: String, ...args: unknown[]): unknown {
    if (!value) return '';
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

}
