import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Response } from '../../../modelos/response';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) { }


  saveSong(token: string, json: string): Observable<Response> {
    console.log('El json es ', json);
    console.log('El token es ', token);
    const headers = new HttpHeaders({
      authorization: token
    }).set('Content-Type', 'application/json');
    return this.http.post<Response>(environment.saveSongLocal, json, { headers });
  }

  getSong(token: string, id: string): Observable<Response> {
    console.log('El id es ', id);
    console.log('El token es ', token);
    const headers = new HttpHeaders({
      authorization: token
    }).set('Content-Type', 'application/json');
    return this.http.get<Response>(environment.getSongLocal + id, { headers });
  }

  getSongs(token: string, album: string): Observable<Response> {
    console.log('El album es ', album);
    console.log('El token es ', token);
    const headers = new HttpHeaders({
      authorization: token
    }).set('Content-Type', 'application/json');
    return this.http.get<Response>(environment.getSongAlbumLocal + album, { headers });
  }

  getAudioFile(song: string): Observable<Response> {
    console.log('El song es ', song);
    const headers = new HttpHeaders({
    }).set('Content-Type', 'application/json');
    return this.http.get<Response>(environment.getAudiloLocal + song, { headers });
  }

}
