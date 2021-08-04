import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'httpMixedContent'
})
export class HttpMixedContentPipe implements PipeTransform {

  transform(value: string): string {
    if (value.startsWith('https')) {
      return value.replace('https:', '')
    } else {
      return value.replace('http:', '');
    }
  }

}
