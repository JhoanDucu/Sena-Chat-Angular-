import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrarService {
  url = "http://localhost:3000";
  constructor(private http: HttpClient) { }
  enviarDatos(datos: any) {
    return this.http.post<string>(`${this.url}/usuario/registrar`, datos);
  }
}
