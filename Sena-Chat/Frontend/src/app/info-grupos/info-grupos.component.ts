import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SesionService } from '../Sesiones/sesion.service';
import { Usuario } from '../Modelos/usuarios';
import { ChatService } from '../Servicios/chat.service';

@Component({
  selector: 'app-info-grupos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-grupos.component.html',
  styleUrl: './info-grupos.component.css'
})
export class InfoGruposComponent {
  constructor (
    protected Sesion: SesionService,
    private Chat: ChatService
  ) {}
  miembros: Usuario[] = [];
  usuario = this.Sesion.get('documento');
  @Input() grupoSeleccionado: string | null = '';

  consultarMiembros() {
    this.Chat.traerMiembros(this.grupoSeleccionado).subscribe((data: any) => { this.miembros = data });
  }
}
