import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../../../servidor';

@Injectable({
  providedIn: 'root'
})
export class ConfigurarService {
  constructor(private http: HttpClient) { }
  
  actualizarUsuario(Datos: any, numerodoc: any) {
    return this.http.put(`${url}/usuario/configurar/${numerodoc}`, Datos);
  }
  subirImagen(datos: FormData) {
    return this.http.post(`${url}/chat/subir-imagen`, datos);
  }
}
