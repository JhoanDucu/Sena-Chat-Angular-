import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatService } from './chat.service';
import { url } from '../../../servidor'; 

@Injectable({
  providedIn: 'root'
})
export class LogearService {
  constructor(private http: HttpClient, private chat: ChatService) { }
  
  buscarDatos(datos: any) {
    return this.http.post(`${url}/usuario/login`, datos);
  }
  seleccionarFicha(ficha: any, numerodoc: any) {
    return this.http.put(`${url}/usuario/bienvenida/${numerodoc}`, ficha);
  }
  mandarCorreo(datos: any) {
    return this.http.post(`${url}/usuario/autenticar`, datos);
  }
  establecerCarga = () => this.chat.cambiarEstadoCarga(true);
}