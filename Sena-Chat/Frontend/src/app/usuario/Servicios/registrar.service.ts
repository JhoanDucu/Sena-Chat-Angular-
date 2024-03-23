import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from '../../../servidor';

@Injectable({
  providedIn: 'root'
})
export class RegistrarService {
  constructor(private http: HttpClient) { }

  enviarDatos(datos: any) {
    return this.http.post<string>(`${url}/usuario/registrar`, datos);
  }
}