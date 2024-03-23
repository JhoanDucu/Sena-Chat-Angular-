import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { MensajeEmitir } from '../Modelos/mensaje';
import { url } from '../../../servidor';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor() {
    // this.io.on('test2', (m) => console.log(m));
    // ESTE ES UN EJEMPLO DE TEST
  }
  private options = {
    withCredentials: true,
    autoConnect: true
  };
  private io = io(url, this.options);
  private ioConnected = io(`${url}/online`, this.options);
  private recibido = false;

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
