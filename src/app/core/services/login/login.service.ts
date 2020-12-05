import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Response } from '../../../modelos/response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  login(json: string): Observable<Response> {
    console.log('El json es', json);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Response>(environment.loginUserLocal, json, {headers});
  }

  loginArtist(json: string): Observable<Response> {
    console.log('El json es', json);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Response>(environment.loginArtistLocal, json, {headers});
  }

}
