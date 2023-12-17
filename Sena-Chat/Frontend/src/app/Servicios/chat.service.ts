import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) { }
  url = "http://localhost:3000";
  traerGrupos(ficha: any, usuario: any){
    return this.http.get(`${this.url}/chat/grupos/${ficha}/${usuario}`);
  }
  traerMensajes(grupo: any){
    return this.http.get(`${this.url}/chat/mensajes/${grupo}`);
  }
  traerUsuario(documento: any){
    return this.http.get(`${this.url}/usuario/${documento}`);
  }
  destino(grupo: any, usuario: any){
    return this.http.get(`${this.url}/destino/${grupo}/${usuario}`);
  }
  agregarMensaje(datos: any){
    return this.http.post(`${this.url}/mensaje`, datos);
  }
  traerPrivados(ficha: any, usuario: any){
    return this.http.get(`${this.url}/chat/privados/${ficha}/${usuario}`);
  }
  traerMiembros(grupo: any){
    return  this.http.get(`${this.url}/chat/miembros/${grupo}`)
  }
}
