import { Injectable } from '@angular/core';
import { BaseService } from '../shared/base/base.service';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';



@Injectable({
    providedIn: 'root'
})
export class LoginService extends BaseService {
    public isLoggedIn: boolean = false;
    public redirectUrl: string;
    constructor(private http: HttpClient) {
        super();

    }

    public login(nilaiSimpan: any): Observable<any[]> {
        return this.http.post<any[]>(this.URL_ROOT + 'ruser/login', nilaiSimpan)
            .pipe(
                catchError(this.handleError) // then handle the error
            );
    }


}
