import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor() { 
    this.io.emit('test');

    this.io.on('test2', ()=> {
      alert('alert2');
    });
  }
  url = "http://localhost:3000";
  io = io(this.url, {
    withCredentials: true,
    autoConnect: true
  });
}
