import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SonidosService {
  private notificationSound: HTMLAudioElement;
  private messageSound: HTMLAudioElement;
  constructor() {
    this.notificationSound = new Audio('../../../assets/audio/livechat-129007.mp3');
    this.messageSound = new Audio('../../../assets/audio/message-13716.mp3');
  }

  playNotificationSound = () => this.notificationSound.play();
  playMessage = () => this.messageSound.play();
  
}