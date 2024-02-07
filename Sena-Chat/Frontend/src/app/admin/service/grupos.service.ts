import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  constructor(private http: HttpClient) { }
  url = "http://localhost:3000";

  traerGrupos = () => this.http.get(`${this.url}/admin/grupos`);

}
