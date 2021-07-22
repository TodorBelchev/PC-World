import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'warrantyExpirationDate'
})
export class WarrantyExpirationDatePipe implements PipeTransform {

  transform(value: string, warranty: number): string {
    const date = new Date(Number(value));
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const surplusYears = warranty / 12;

    return `${day}/${month + 1}/${year + surplusYears}`;
  }

}
