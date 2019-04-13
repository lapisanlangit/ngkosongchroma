import { Component,Input } from '@angular/core';

@Component({
    selector: 'app-nodata',
    templateUrl: './nodata.component.html'
})
export class NodataComponent {
  @Input() nRecord:number=0;
  

}