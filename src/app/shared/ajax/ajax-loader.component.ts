import { Component,Input } from '@angular/core';

@Component({
    selector: 'app-ajax', //   moduleId: module.id,
    templateUrl: './ajax-loader.component.html'
})
export class AjaxLoaderComponent {
    
  @Input()
  ajax:number;
  imgGir:any;


  constructor(){

    this.imgGir='./assets/img/gears.gif';

  }
}