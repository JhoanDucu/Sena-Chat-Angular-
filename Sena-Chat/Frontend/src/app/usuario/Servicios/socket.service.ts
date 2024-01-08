import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor() { 
    this.io.on('test2', (m) => console.log(m));
  }
  url = "http://localhost:3000";
  io = io(this.url, {
    withCredentials: true,
    autoConnect: true
  });

  emitirMensaje(datos: any){
    this.io.emit('enviarMensaje', datos);
  }

  recibirPrivado(){
    this.io.on('Recibe', (m) => console.log(m));
  }
}
