import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeEnviar } from '../Modelos/mensaje';
import { Subject } from 'rxjs';
import { url } from '../../../servidor';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) { }
  
  private cargandoSubject = new Subject<boolean>();
  eventoCarga = this.cargandoSubject.asObservable();

  traerGrupos(ficha: any, usuario: any) {
    return this.http.get(`${url}/chat/grupos/${ficha}/${usuario}`);
  }
  traerMensajes(grupo: any) {
    return this.http.get(`${url}/chat/mensajes/${grupo}`);
  }
  traerUsuario(documento: any) {
    return this.http.get(`${url}/usuario/${documento}`);
  }
  destino(grupo: any, usuario: any) {
    return this.http.get(`${url}/chat/destino/${grupo}/${usuario}`);
  }
  agregarMensaje(datos: MensajeEnviar) {
    return this.http.post(`${url}/chat/mensaje`, datos);
  }
  traerPrivados(ficha: any, usuario: any) {
    return this.http.get(`${url}/chat/privados/${ficha}/${usuario}`);
  }
  traerMiembros(grupo: any) {
    return this.http.get(`${url}/chat/miembros/${grupo}`)
  }
  masNotificaciones(datos: any) {
    return this.http.put(`${url}/chat/aumentar/notificaciones`, datos);
  }
  sinNotificaciones(datos: any) {
    return this.http.put(`${url}/chat/anular/notificaciones`, datos);
  }
  cambiarEstadoCarga(estado: boolean) {
    this.cargandoSubject.next(estado);
  }
  subirImagen(datos: FormData) {
    return this.http.post(`${url}/chat/subir-imagen`, datos);
  }
}
