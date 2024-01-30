import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario } from '../Modelos/usuarios';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css'
})
export class MiPerfilComponent {
  constructor() { }
  @Input() perfil: Usuario | any;
  myToastEl: any;

  ngOnInit(): void {
    this.myToastEl = new Toast(document.getElementById('liveToast') as HTMLElement);
  }

  toast = () => this.myToastEl.show();
}
