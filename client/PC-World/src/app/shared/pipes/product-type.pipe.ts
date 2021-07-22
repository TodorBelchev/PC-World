import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productType'
})
export class ProductTypePipe implements PipeTransform {

  transform(value: string | undefined): string {
    let result = '';
    if (value == 'Notebook') {
      result = 'notebooks';
    }

    return result;
  }

}
