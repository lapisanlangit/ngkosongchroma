import { Component, OnInit } from '@angular/core';
import { Pesan } from '../pesan/pesan'
declare var jQuery: any;

@Component({
     selector: 'app-base',
    template: ''
})
export class BaseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  public errorMessage: string;
  public ajax = 0;
  public ajaxKecil = 0;
  //public webUrl = 'http://localhost:3000/';
  public webUrl = 'http://localhost:3000/';
  //public webGambar = 'http://localhost/wsoleh/public/assets/foto/';
  public setPesan: Pesan;



  public replaceAll(str: string, cCari: string, cReplace: string) {
      return str.replace(/cCari|_/g, cReplace);
  }

  /**
   * set Multiple modal supaya scroll tidak holang
   */
  public setModal() {
      jQuery('.modal').on('hidden.bs.modal', function (e) {
          if (jQuery('.modal').hasClass('in')) {
              jQuery('body').addClass('modal-open');
          }
      });
  }

  public toTitleCase(str) {
      return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  }



  public susunListTabel(data, columns, styles, judulKolom) {
      var body = [];
      // if judul Kolom empty, is not push
      if (judulKolom.length > 0) {
          body.push(judulKolom);
      }
      data.forEach(function (row) {

          var dataRow = [];
          for (let i = 0; i < columns.length; i++) {
              if (columns[i].constructor === Array) {
                  var barisTampung = '';
                  var objKolomTampung = {};
                  columns[i].forEach(function (isi) {
                      barisTampung = barisTampung + row[isi].toString() + '\n';
                      var objKolom2 = {};
                      var arrayTampung = [];
                      objKolom2['text'] = barisTampung.toString();
                      objKolom2['style'] = styles[i].toString();
                      objKolomTampung = objKolom2;
                  })
                  dataRow.push(objKolomTampung);
              } else {
                  var objKolom = {};
                  objKolom['text'] = row[columns[i]].toString();
                  objKolom['style'] = styles[i].toString();
                  dataRow.push(objKolom);
              }

          }
          body.push(dataRow);
      });

      return body;
  }

  public formatRow(daftar, nmstyle, indeksKondisi, kondisi) {
      for (let index = 1; index < daftar.length; index++) {
          const element = daftar[index][indeksKondisi].text;
          if (element == kondisi) {
              var dataRow2 = [];
              for (let index2 = 0; index2 < daftar[0].length; index2++) {
                  var objKolom1 = {};
                  objKolom1['text'] = daftar[index][index2].text;
                  objKolom1['style'] = nmstyle[index2];
                  dataRow2.push(objKolom1);
              }
              daftar.splice(index, 1, dataRow2)
          }
      }
      return daftar
  }


  public formatKolomKhusus(daftar, nmstyle, indeksKondisi, kondisi, kolomKe) {
      for (let index = 1; index < daftar.length; index++) {
          const element = daftar[index][indeksKondisi].text;
          if (element == kondisi) {
              var objKolom1 = {};
              objKolom1['text'] = daftar[index][kolomKe].text;
              objKolom1['style'] = nmstyle;
              daftar[index][kolomKe] = objKolom1

          }

      }
      return daftar
  }


  public ribuanKoma(bilangan) {
      var number_string = bilangan.toString(),
          split = number_string.split('.'),
          sisa = split[0].length % 3,
          rupiah = split[0].substr(0, sisa),
          ribuan = split[0].substr(sisa).match(/\d{1,3}/gi);

      if (ribuan) {
          let separator = sisa ? '.' : '';
          rupiah += separator + ribuan.join('.');
      }
      rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
      return rupiah
  }


  public formatColSpan(daftar,kolomKe,jmlKolom){
      for (let index = 1; index < daftar.length; index++) {
              //ditambah colspan
            
              var objKolom={};  
              objKolom['text'] = daftar[index][kolomKe].text;
              objKolom['style'] = daftar[index][kolomKe].style;
              objKolom['colSpan'] = jmlKolom;
              daftar[index][kolomKe]=objKolom;
              objKolom={};  
              objKolom['text'] = '';
              daftar[index][kolomKe+1]=objKolom;
      }
      return daftar
    }

  /**
   * memformat angka menjadi ribuan
   * @param nilai angka
   * @return angka dalam peisah ribahan
   */

  public ribuan(nilai) {
      return nilai.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  }

  public pad(n, width, z) {
      z = z || '0';
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }


}
