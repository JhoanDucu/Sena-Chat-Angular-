import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupoComponentData, Tabs } from '../../Modelos/grupos';
import { SesionService } from '../Sesiones/sesion.service';
import { ChatDirective } from '../Directivas/chat.directive';
import { SocketService } from '../Servicios/socket.service';
import { GrupoComponent } from '../grupo/grupo.component';
import { BuscadorComponent } from '../buscador/buscador.component';
import { MiPerfilComponent } from '../mi-perfil/mi-perfil.component';
import { GruposTituloComponent } from '../grupos-titulo/grupos-titulo.component';
import { GruposPanelComponent } from '../grupos-panel/grupos-panel.component';
import { BootstrapService } from '../Servicios/bootstrap.service';
import { Usuario } from '../../Modelos/usuarios';
import { urlImagenes } from '../../../servidor';

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [
    CommonModule,
    ChatDirective,
    GrupoComponent,
    BuscadorComponent,
    MiPerfilComponent,
    GruposTituloComponent,
    GruposPanelComponent
  ],
  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.css'
})
export class GruposComponent {
  constructor(
    protected Sesion: SesionService,
    private socket: SocketService,
    private B: BootstrapService
  ) { }
  @Input() datos: GrupoComponentData = { grupos: [], privados: [] };
  @Input() usuario: Usuario = {};
  @Input() changesValue = '';
  @Input() picked: any = {};
  @Output() makeChange = new EventEmitter<any[]>();
  tabs: Tabs = {
    grupos: { class: true, new: false },
    privados: { class: false, new: false },
    ajustes: { class: false, new: false },
    perfil: { class: false, new: false },
    otra1: { class: false, new: false },
    otra2: { class: false, new: false }
  }
  enBusqueda = false;
  url = urlImagenes;

  ngOnInit(): void { this.B.iniciarInstanciasChat(); }

  seleccionarEnGrupos = (id: any, index: number, type: string) => {
    if (this.Sesion.get('grupos')) this.socket.gestionarSalas({ accion: 'salirSala', id_grupo: this.Sesion.get('grupos') });
    this.makeChange.emit([ChatDirective.seleccionar(this.changesValue), String(id), index, type]);
    this.socket.gestionarSalas({ accion: 'unirSala', id_grupo: String(id) });
  };

  mostrarTab = (tab: string) => {
    this.Sesion.set('pestaña', tab);
    for (const key in this.tabs) key == tab ? this.tabs[key] = { class: true, new: false } : this.tabs[key].class = false;
  };

  animarTab = (tab: string) => this.Sesion.get('pestaña') === tab ? 'ANIMAR GRUPO' : this.tabs[tab].new = true;

  mostrarBusqueda = (value: boolean) => this.enBusqueda = value;

  abrir = () => this.B.modal();

  cambiarPosicion (index: any, type: 'grupos' | 'privados') {
    this.datos[type].unshift(this.datos[type].splice(index, 1)[0]);
  }

  tiene = (objeto: any) => ChatDirective.contieneMensajes(objeto);

}