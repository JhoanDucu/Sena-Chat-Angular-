import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogearService {
  url = "http://localhost:3000";
  constructor(private http: HttpClient) { }
  buscarDatos(datos: any){
    return this.http.post(`${this.url}/login`,datos);
  }
  seleccionarFicha(ficha: any, numerodoc: any){
    return this.http.put(`${this.url}/bienvenida/${numerodoc}`,ficha);
  }
  mandarCorreo(datos: any){
    return this.http.post(`${this.url}/autenticar`, datos);
  }
}
