import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable()
export class BaseService {

  URL_ROOT:string;

  constructor() { 
    this.URL_ROOT='http://localhost:4000/';
    
  }


  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  public hilangkanKoma(nilai: number) {
    let strnilai = nilai.toLocaleString()
    return parseInt(strnilai.replace(/,/g, ""));

  }

  public setTglInsert(stgl: string) {
    var str = stgl;
    var xtahun = str.substr(6, 4);
    var xbulan = str.substr(3, 2);
    var xtgl = str.substr(0, 2);

    return xtahun + '-' + xbulan + '-' + xtgl;
  }


  public setTglIndo(stgl: string) {
    var str = stgl;
    var xtahun = str.substr(0, 4);
    var xbulan = str.substr(5, 2);
    var xtgl = str.substr(8, 2);

    return xtgl + '-' + xbulan + '-' + xtahun;
  }

  public namaBulan(nm) {

    switch (nm) {
      case '01':
        var m = 'Januari';
        break;
      case '02':
        var m = 'Februari';
        break;
      case '03':
        var m = 'Maret';
        break;
      case '04':
        var m = 'April';
        break;
      case '05':
        var m = 'Mei';
        break;
      case '06':
        var m = 'Juni';
        break;
      case '07':
        var m = 'Juli';
        break;
      case '08':
        var m = 'Agustus';
        break;
      case '09':
        var m = 'September';
        break;
      case '10':
        var m = 'Oktober';
        break;
      case '11':
        var m = 'November';
        break;
      case '12':
        var m = 'Desember';
        break;

    }
    return m;

  }

  public namahariIndo(strdayname: string) {

    switch (strdayname.trim().toUpperCase()) {
      case 'MONDAY':
        var m = 'Senin';
        break;
      case 'TUESDAY':
        var m = 'Selasa';
        break;
      case 'WEDNESDAY':
        var m = 'Rabu';
        break;
      case 'THURSDAY':
        var m = 'Kamis';
        break;
      case 'FRIDAY':
        var m = 'Jumat';
        break;
      case 'SATURDAY':
        var m = 'Sabtu';
        break;
      case 'SUNDAY':
        var m = 'Minggu';
        break;
    }
    return m;
  }

  public setTglIndoPanjang(stgl: string) {
    // console.log(stgl);
    var str = stgl;
    var xtahun = str.substr(0, 4);
    var xbulan = this.namaBulan(str.substr(5, 2));
    var xtgl = str.substr(8, 2);

    return xtgl + ' ' + xbulan + ' ' + xtahun;
  }

  // protected _handleError(error: any) {

  //   let errMsg = (error.message) ? error.message :
  //     error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  //   console.error(errMsg); // log to console instead
  //   return Observable.throw(errMsg);
  // }

  public cariIndex(arraytosearch: any, key: any, valuetosearch: any) {
    //console.log(arraytosearch);

    for (var i = 0; i < arraytosearch.length; i++) {

      if (arraytosearch[i][key] == valuetosearch) {
        return i;
      }
    }
    return null;
  }



  public makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for (var i = 0; i < files.length; i++) {
        formData.append("uploads[]", files[i], files[i].name);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open("POST", url, true);
      xhr.send(formData);
    });
  }


  public cekEmail(isiemail) {

    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
    if (isiemail == '' || !re.test(isiemail)) {
      return 0;
    } else {
      return 1;
    }

  };

  /**
   * @param : kosong
   * @return : tanggal hari ini format dd-mm-yyyy
   */
  public tglHariini = function () {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    let xdd: string;
    let xmm: string;

    if (dd < 10) {
      xdd = '0' + dd
    } else {

      xdd = dd.toString();
    }

    if (mm < 10) {
      xmm = '0' + mm
    } else {
      xmm = mm.toString();
    }

    var xtoday = xdd + '-' + xmm + '-' + yyyy;
    return xtoday
  };

  /**
   * methode untuk mendapatkan bulan ini
   * @param : kosong
   * @return : string = bulan 2 digit
   */
  public getBulanIni = function () {

    var today = new Date();
    var mm = today.getMonth() + 1; //January is 0!

    let xmm: string;
    if (mm < 10) {
      xmm = '0' + mm
    } else {
      xmm = mm.toString();
    }


    return xmm
  };

  /**
   * mengecek apakah isian tanggal itu valid
   * @param input format dd/mm/yyyy
   */

  public cekValiditasTgl(input) {
    let reg = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
    if (input.match(reg)) {
      return true;
    } else {
      return false;
    }
  }


  public ribuanSatuan(nilai) {
    return nilai.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }


  public downloadURI = function (uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
  }


}
