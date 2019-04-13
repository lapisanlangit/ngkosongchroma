import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base/base.service';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Kppn } from './kppn';


@Injectable({
  providedIn: 'root'
})
export class KppnService extends BaseService {

  constructor(private http: HttpClient) {
    super();

  }

  public getKPPN(): Observable<Kppn[]> {
    return this.http.get<Kppn[]>(this.URL_ROOT + 'rkppn/getKPPN')
      .pipe(
        retry(3),
        catchError(this.handleError) // then handle the error
      );
  }

  public cekKppn(nilaiSimpan:Kppn): Observable<Kppn[]> {
    return this.http.post<Kppn[]>(this.URL_ROOT + 'rkppn/cekKppn',nilaiSimpan)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  public saveKppn(nilaiSimpan:Kppn): Observable<Kppn[]> {
    return this.http.post<Kppn[]>(this.URL_ROOT + 'rkppn/saveKppn',nilaiSimpan)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  public updateKppn(nilaiSimpan:Kppn): Observable<Kppn[]> {
    return this.http.post<Kppn[]>(this.URL_ROOT + 'rkppn/updateKppn',nilaiSimpan)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  
  public hapusKppn(nilaiSimpan:any): Observable<Kppn[]> {
    return this.http.post<any>(this.URL_ROOT + 'rkppn/hapusKppn',nilaiSimpan)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }
}
