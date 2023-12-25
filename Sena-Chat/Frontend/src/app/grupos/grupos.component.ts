import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Grupo } from '../Modelos/grupos';
import { ChatService } from '../Servicios/chat.service';
import { SesionService } from '../Sesiones/sesion.service';

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.css'
})
export class GruposComponent {
  constructor(
    private Chat: ChatService,
    protected Sesion: SesionService
  ) { }
  grupos: Grupo[] = [];
  privados: Grupo[] = [];
  @Input() changesValue = '';
  @Input() selected: any = {};
  @Output() makeChange = new EventEmitter<string[]>();
  fichaSeleccionada = this.Sesion.get('ficha');
  usuario = this.Sesion.get('documento');
  pestañas = {
    gruposVisible: () => this.Sesion.set('pestaña', 'grupos'),
    privadosVisible: () => this.Sesion.set('pestaña', 'privados'),
    cerrarVisible: () => this.Sesion.set('pestaña', 'cerrar'),
  }

  ngOnInit(): void {
    this.Chat.traerGrupos(this.fichaSeleccionada, this.usuario).subscribe((data: any) => data.forEach((element: any) => { this.grupos.push(element) }));
    this.Chat.traerPrivados(this.fichaSeleccionada, this.usuario).subscribe((data: any) => data.forEach((element: any) => { this.privados.push(element) }));
  }

  static seleccionar = (value: string) => { return value = value == '0' ? '1' : '0' }

  seleccionarEnGrupos = (id: any) => {
    this.Sesion.remove('grupos');
    this.makeChange.emit([this.changesValue == '0' ? '1' : '0', id]);
  };

  mostrarGrupos = () => this.pestañas.gruposVisible;

  mostrarPrivados = () => this.pestañas.privadosVisible;

  cerrarSesion = () => this.Sesion.clear();
}
