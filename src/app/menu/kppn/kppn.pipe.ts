import { Pipe, PipeTransform } from '@angular/core';
import { Kppn } from './kppn';

@Pipe({
  name: 'kppnFilter'
})

export class KppnFilterPipe implements PipeTransform {
   transform(value: Kppn[], filter: string): Kppn[] {
      filter = filter ? filter.toLocaleLowerCase() : '';
      return filter && value ?
        value.filter(isi =>
           (isi.kdkppn.toLocaleLowerCase().indexOf(filter) !== -1) ||
           (isi.nmkppn.toLocaleLowerCase().indexOf(filter) !== -1)
        ) :
        value;
   }
}