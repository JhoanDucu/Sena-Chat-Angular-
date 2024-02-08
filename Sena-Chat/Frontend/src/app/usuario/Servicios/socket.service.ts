import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { MensajeEmitir } from '../Modelos/mensaje';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = "http://localhost:3000";
  private options = {
    withCredentials: true,
    autoConnect: true
  };
  private io = io(this.url, this.options);
  private ioConnected = io(`${this.url}/online`, this.options);
  private recibido = false;

  constructor() {
    // this.io.on('test2', (m) => console.log(m));
    // ESTE ES UN EJEMPLO DE TEST
  }

  conectarEnGrupo(room: any) {
    this.io.emit('disponible', room);
  }

  emitirMensaje(datos: any) {
    this.ioConnected.emit('enviarMensaje', datos);
    this.io.emit('notificar', datos);
  }

  recibirMensaje() {
    return new Observable<MensajeEmitir>((subscriber) => {
      this.ioConnected.on('recibeMensaje', (nuevoMensaje: any) => {
        subscriber.next(nuevoMensaje);
        this.recibido = true;
      });
    });
  }

  gestionarSalas(opciones: { accion: string, id_grupo: string | null }) {
    this.ioConnected.emit(opciones.accion, opciones.id_grupo);
  }

  notificaMensaje() {
    return new Observable<MensajeEmitir>((subscriber) => {
      this.io.on('notificarMensaje', (nuevoMensaje: any) => {
        this.recibido ? this.recibido = false : subscriber.next(nuevoMensaje);
      });
    });
  }

  // cambiarNamespace(namespace: string) {
  //   this.ioConnected.disconnect();
  //   return io(`${this.url}/${namespace}`, {
  //     withCredentials: true,
  //     autoConnect: true
  //   });
  // }
}
