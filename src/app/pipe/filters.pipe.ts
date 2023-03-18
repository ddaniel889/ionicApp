import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './../model/product';

@Pipe({
  name: 'filters'
})
export class FiltersPipe implements PipeTransform {

  transform(arr: Product[], text: string): Product[] {
    if(text ===''){
      return arr;
    }
    text.toLowerCase();
    return arr.filter(d => {
      return d.name.toLowerCase().includes(text);
    });

  }

}
