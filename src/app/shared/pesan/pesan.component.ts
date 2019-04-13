import { Component,Input,EventEmitter,Output } from '@angular/core';
import { Pesan } from './pesan';


@Component({
    selector: 'app-pesan',
    templateUrl: './pesan.component.html'
})
export class PesanComponent {
  @Input() pesan:Pesan;
  @Output() pilihan: EventEmitter<string> = new EventEmitter<string>();


  pilihanClick() {
        this.pilihan.emit('yes');
  }

}