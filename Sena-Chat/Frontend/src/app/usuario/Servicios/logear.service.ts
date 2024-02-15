import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class LogearService {
  url = "http://localhost:3000";
  constructor(private http: HttpClient, private chat: ChatService) { }
  buscarDatos(datos: any) {
    return this.http.post(`${this.url}/usuario/login`, datos);
  }
  seleccionarFicha(ficha: any, numerodoc: any) {
    return this.http.put(`${this.url}/usuario/bienvenida/${numerodoc}`, ficha);
  }
  mandarCorreo(datos: any) {
    return this.http.post(`${this.url}/usuario/autenticar`, datos);
  }
  establecerCarga = () => this.chat.cambiarEstadoCarga(true);
}
