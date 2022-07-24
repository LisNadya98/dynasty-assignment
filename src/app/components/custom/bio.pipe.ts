import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateLongText'
})
export class BioPipe implements PipeTransform {
  transform(value: string): string {
    const string = value ? value : '';
    return string.length > 25 ? `${string.substring(0, 25)}...` : string;
  }
}
