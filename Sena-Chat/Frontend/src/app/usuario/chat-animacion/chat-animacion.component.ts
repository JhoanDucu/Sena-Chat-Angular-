import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-chat-animacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-animacion.component.html',
  styleUrl: './chat-animacion.component.css'
})
export class ChatAnimacionComponent {
  loadingMessages = [
    {m: 'Estableciendo conexión...', d: 1, w: '55%'},
    {m: 'Cargando mensajes...', d: 2, w: '58%'},
    {m: '', d: 1, w: '42%'}
    // Rango 42 - 70
  ];
  porcentaje = 0;

  ngOnInit(): void {
    this.addMessagePeriodically();
  }

  addMessagePeriodically(): void {
    // setTimeout(() => new Modal(document.getElementById('exampleModal') as HTMLElement).show(), 10000);
    // const interval = setInterval(() => {
    //   if (this.porcentaje < 100) {
    //     const incremento = Math.floor(Math.random() * (30 - 20 + 1)) + 20; // Genera un número aleatorio entre 20 y 30
    //     this.porcentaje += incremento;
    //   } else clearInterval(interval);
    // }, 6000);
  }
}
