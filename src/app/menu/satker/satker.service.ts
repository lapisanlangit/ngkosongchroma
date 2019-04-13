import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base/base.service';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Satker } from './satker';


@Injectable({
  providedIn: 'root'
})
export class SatkerService extends BaseService {

  constructor(private http: HttpClient) {
    super();

  }

  public getSatker(): Observable<Satker[]> {
    return this.http.get<Satker[]>(this.URL_ROOT + 'rsatker/getSatker')
      .pipe(
        retry(3),
        catchError(this.handleError) // then handle the error
      );
  }

  public cekSatker(nilaiSimpan:Satker): Observable<Satker[]> {
    return this.http.post<Satker[]>(this.URL_ROOT + 'rsatker/cekSatker',nilaiSimpan)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  public saveSatker(nilaiSimpan:Satker): Observable<Satker[]> {
    return this.http.post<Satker[]>(this.URL_ROOT + 'rsatker/saveSatker',nilaiSimpan)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  public updateSatker(nilaiSimpan:Satker): Observable<Satker[]> {
    return this.http.post<Satker[]>(this.URL_ROOT + 'rsatker/updateSatker',nilaiSimpan)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  
  public hapusSatker(nilaiSimpan:any): Observable<Satker[]> {
    return this.http.post<any>(this.URL_ROOT + 'rsatker/hapusSatker',nilaiSimpan)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  
  public getDetailSatker(ckdSatker): Observable<any[]> {
    return this.http.get<any[]>(this.URL_ROOT + 'rsatker/getDetailSatker?kdsatker='+ckdSatker)
      .pipe(
        retry(3),
        catchError(this.handleError) // then handle the error
      );
  }
}
