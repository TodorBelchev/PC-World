import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productType'
})
export class ProductTypePipe implements PipeTransform {

  transform(value: string | undefined): string {
    let result = '';
    if (value == 'Notebook') {
      result = 'notebooks';
    } else if (value == 'Cooler') {
      result = 'components/coolers'
    } else if (value == 'Case') {
      result = 'components/cases'
    } else if (value == 'Hdd') {
      result = 'components/hdds'
    } else if (value == 'Memory') {
      result = 'components/memories'
    } else if (value == 'Monitor') {
      result = 'monitors'
    } else if (value == 'Motherboard') {
      result = 'components/motherboards'
    } else if (value == 'Processor') {
      result = 'components/processors'
    } else if (value == 'Psu') {
      result = 'components/psus'
    } else if (value == 'Ssd') {
      result = 'components/ssds'
    } else if (value == 'Vga') {
      result = 'components/vgas'
    }

    return result;
  }

}
