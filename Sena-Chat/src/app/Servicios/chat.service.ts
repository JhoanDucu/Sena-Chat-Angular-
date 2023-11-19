import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) { }
  url = "http://localhost:3000";
  traerGrupos(ficha: any){
    return this.http.get(`${this.url}/chat/grupos/${ficha}`);
  }
  traerMensajes(grupo: any){
    return this.http.get(`${this.url}/chat/mensajes/${grupo}`);
  }

  traerUsuario(documento: any){
    return this.http.get(`${this.url}/usuario/${documento}`);
  }

  agregarMensaje(datos: any){
    return this.http.post(`${this.url}/mensaje`, datos);
  }
}
