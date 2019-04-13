import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tglIndo'
})

export class TglIndoPipe implements PipeTransform {
    transform(value: string, stgl: string[]): string {
          var str = value;
		  var xtahun =str.substr(0, 4);
		  var xbulan=str.substr(5, 2);
		  var xtgl=str.substr(8, 2);
		  return xtgl+'-'+xbulan+'-'+xtahun;
        
    }
}