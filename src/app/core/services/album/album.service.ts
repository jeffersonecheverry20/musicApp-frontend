import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Response } from '../../../modelos/response';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }

  getAlbums(id: string, token: string, validador: boolean): Observable<Response> {
    if (validador) {
      console.log('El id del usuario es', id);
      console.log('El token es ', token);
      const headers = new HttpHeaders({
        authorization: token
      }).set('Content-Type', 'application/json');
      return this.http.get<Response>(environment.getAllAlbums + id, { headers });
    } else {
      console.log('El token es ', token);
      const headers = new HttpHeaders({
        authorization: token
      }).set('Content-Type', 'application/json');
      return this.http.get<Response>(environment.getAllAlbums, { headers });
    }
  }

  saveAlbum(token: string, json: string): Observable<Response> {
      console.log('El json es ', json);
      console.log('El token es ', token);
      const headers = new HttpHeaders({
        authorization: token
      }).set('Content-Type', 'application/json');
      return this.http.post<Response>(environment.saveAlbum, json, { headers });
  }

}
