import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Response } from '../../../modelos/response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  updateUser(id: string, json: string, token: string): Observable<Response> {
    console.log('El id del usuario es', id);
    console.log('El token es ', token);
    console.log(json);
    const headers = new HttpHeaders({
      authorization: token
    }).set('Content-Type', 'application/json');
    return this.http.put<Response>(environment.updateUserLocal + id, json, {headers});
  }

  getUser(id: string, token: string): Observable<Response> {
    console.log('El id del usuario es', id);
    console.log('El token es ', token);
    const headers = new HttpHeaders({
      authorization: token
    }).set('Content-Type', 'application/json');
    return this.http.get<Response>(environment.getUserLocal + id, {headers});
  }

  uploadImageUser(id: string): Observable<Response> {
    console.log('El id del usuario es', id);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Response>(environment.uploadImageUserLocal, id);
  }

  getImageUser(imageFile: string): Observable<Response> {
    console.log('El id del usuario es', imageFile);
    const headers = new HttpHeaders({
      Authorization: sessionStorage.getItem('token')
    }).set('Content-Type', 'application/json');
    return this.http.get<Response>(environment.getImageUserLocal + imageFile);
  }


  getAllArtists(): Observable<Response> {
    const headers = new HttpHeaders({
      Authorization: sessionStorage.getItem('token')
    }).set('Content-Type', 'application/json');
    return this.http.get<Response>(environment.getAllArtists, {headers});
  }


}
