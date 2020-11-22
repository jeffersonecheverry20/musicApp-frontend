import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Response } from '../../../modelos/response';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  registerUser(json: string): Observable<Response> {
    console.log(json);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Response>(environment.registerUser, json, {headers});
  }

  // tslint:disable-next-line: typedef
  registerArtist(json: string): Observable<Response> {
    console.log(json);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Response>(environment.registerArtist, json, {headers});
  }

}
