import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Authentication } from '../model/authentication.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationsService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  login(loginObj: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/api/Authentications/autenticate`, loginObj);
  }
  

}

