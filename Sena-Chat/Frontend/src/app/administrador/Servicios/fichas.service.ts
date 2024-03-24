import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../../../servidor';

@Injectable({
  providedIn: 'root'
})
export class FichasService {
  constructor(private http: HttpClient) { }
  traerFichas(){
    return this.http.get(`${url}/admin/fichas`);
  }
  traerProgramas(){
    return this.http.get(`${url}/admin/programas`);
  }
}
