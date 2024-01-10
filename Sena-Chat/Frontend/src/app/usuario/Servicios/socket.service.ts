import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { MensajeEmitir, MensajeEnviar } from '../Modelos/mensaje';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor() { 
    // this.io.on('test2', (m) => console.log(m));
    // ESTE ES UN EJEMPLO DE TEST
  }
  private url = "http://localhost:3000";
  private io = io(this.url, {
    withCredentials: true,
    autoConnect: true
  });

  emitirMensaje(datos: any){
    this.io.emit('enviarMensaje', datos);
  }

  recibirMensaje(){
    return new Observable<MensajeEmitir>( subscriber => {
      this.io.on('recibeMensaje', (nuevoMensaje) => subscriber.next(nuevoMensaje) );
    });
  }

  gestionarSalas(opciones: {accion: string, id_grupo: string | null}){
    this.io.emit(opciones.accion, opciones.id_grupo);
  }
}
