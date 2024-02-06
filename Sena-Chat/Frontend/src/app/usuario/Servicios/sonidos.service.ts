import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SonidosService {
  private notificationSound: HTMLAudioElement;
  constructor() {
    this.notificationSound = new Audio('../../../assets/audio/livechat-129007.mp3');
  }

  playNotificationSound() {
    this.notificationSound.play();
  }
}