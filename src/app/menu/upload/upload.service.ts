import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base/base.service';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService extends BaseService {

  constructor(private http: HttpClient) {
    super();

  }


}
