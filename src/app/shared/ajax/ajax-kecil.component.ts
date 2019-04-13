import { Component,Input } from '@angular/core';

@Component({
    selector: 'app-ajax-kecil', //    moduleId: module.id,
    templateUrl: './ajax-kecil.component.html'
})
export class AjaxKecilComponent {
    
  @Input()
  ajaxKecil:number;
  imgProses:any;

  constructor(){
    
        this.imgProses='./assets/img/proses.gif';
    
      }
}