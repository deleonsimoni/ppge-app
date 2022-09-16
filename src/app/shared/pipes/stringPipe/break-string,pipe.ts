import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: 'breakString'
})
export class BreakStringPipe implements PipeTransform {

  transform(url: string) {
    return url.length>50? url.substring(0,50) + ' ' + url.substring(50): url;
  }

}