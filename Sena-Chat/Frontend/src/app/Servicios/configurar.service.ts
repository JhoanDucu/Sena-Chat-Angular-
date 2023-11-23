import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurarService {

  constructor( private http: HttpClient ) { }
  url = 'http://localhost:3000';
  actualizaDatos(Datos: any, numerodoc: any){
    return this.http.put(`${this.url}/configurar/${numerodoc}`,Datos);
  }
}
