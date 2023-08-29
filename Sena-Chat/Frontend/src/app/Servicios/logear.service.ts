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
  seleccionarFicha(ficha: any){
    return this.http.post(`${this.url}ficha.php?n=${ficha}`,JSON.stringify(ficha))
  }
}
