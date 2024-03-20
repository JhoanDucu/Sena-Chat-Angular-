import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeEnviar } from '../Modelos/mensaje';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private cargandoSubject = new Subject<boolean>();
  eventoCarga = this.cargandoSubject.asObservable();
  url = "http://localhost:3000";
  
  constructor(private http: HttpClient) { }

  traerGrupos(ficha: any, usuario: any) {
    return this.http.get(`${this.url}/chat/grupos/${ficha}/${usuario}`);
  }
  traerMensajes(grupo: any) {
    return this.http.get(`${this.url}/chat/mensajes/${grupo}`);
  }
  traerUsuario(documento: any) {
    return this.http.get(`${this.url}/usuario/${documento}`);
  }
  destino(grupo: any, usuario: any) {
    return this.http.get(`${this.url}/chat/destino/${grupo}/${usuario}`);
  }
  agregarMensaje(datos: MensajeEnviar) {
    return this.http.post(`${this.url}/chat/mensaje`, datos);
  }
  traerPrivados(ficha: any, usuario: any) {
    return this.http.get(`${this.url}/chat/privados/${ficha}/${usuario}`);
  }
  traerMiembros(grupo: any) {
    return this.http.get(`${this.url}/chat/miembros/${grupo}`)
  }
  masNotificaciones(datos: any) {
    return this.http.put(`${this.url}/chat/aumentar/notificaciones`, datos);
  }
  sinNotificaciones(datos: any) {
    return this.http.put(`${this.url}/chat/anular/notificaciones`, datos);
  }
  cambiarEstadoCarga(estado: boolean) {
    this.cargandoSubject.next(estado);
  }
  subirImagen(datos: FormData) {
    return this.http.post(`${this.url}/chat/subir-imagen`, datos);
  }
}
