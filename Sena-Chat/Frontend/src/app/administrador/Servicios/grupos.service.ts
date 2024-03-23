import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../../../servidor';

@Injectable({
  providedIn: 'root'
})
export class GruposService {
  constructor(private http: HttpClient) { }
  traerGrupos(){
    return this.http.get(`${url}/admin/grupos`);
  }
}
