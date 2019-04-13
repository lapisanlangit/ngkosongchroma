import { Pipe, PipeTransform } from '@angular/core';
import { Satker } from './satker';

@Pipe({
  name: 'satkerFilter'
})

export class SatkerFilterPipe implements PipeTransform {
   transform(value: Satker[], filter: string): Satker[] {
      filter = filter ? filter.toLocaleLowerCase() : '';
      return filter && value ?
        value.filter(isi =>
           (isi.kdsatker.toLocaleLowerCase().indexOf(filter) !== -1) ||
           (isi.nmsatker.toLocaleLowerCase().indexOf(filter) !== -1)
        ) :
        value;
   }
}