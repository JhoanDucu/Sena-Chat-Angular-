import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupoComponentData, Tabs } from '../Modelos/grupos';
import { SesionService } from '../Sesiones/sesion.service';
import { ChatDirective } from '../Directivas/chat.directive';
import { SocketService } from '../Servicios/socket.service';
import { GrupoComponent } from '../grupo/grupo.component';
import { BuscadorComponent } from '../buscador/buscador.component';
import { MiPerfilComponent } from '../mi-perfil/mi-perfil.component';
import { GruposTituloComponent } from '../grupos-titulo/grupos-titulo.component';
import { GruposPanelComponent } from '../grupos-panel/grupos-panel.component';
import { BootstrapService } from '../Servicios/bootstrap.service';

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
  @Input() datos: GrupoComponentData = {grupos: [], privados: []};
  @Input() usuario: any;
  @Input() changesValue = '';
  @Input() selected: any = {};
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

  ngOnInit(): void { }

  seleccionarEnGrupos = (id: any, index: number, type: string) => {
    if (this.Sesion.get('grupos')) this.socket.gestionarSalas({ accion: 'salirSala', id_grupo: this.Sesion.get('grupos') });
    this.makeChange.emit([ChatDirective.seleccionar(this.changesValue), String(id), index, type]);
    this.socket.gestionarSalas({ accion: 'unirSala', id_grupo: String(id) });
  };

  showTab = (tab: string) => {
    this.Sesion.set('pestaña', tab);
    for (const key in this.tabs) key == tab ? this.tabs[key].class = true : this.tabs[key].class = false;
  };

  mostrarBusqueda = (value: boolean) => this.enBusqueda = value;

  abrir = () => this.B.modal();

  cambiarPosicion(index: any, objeto: any, opcion: number) {
    let tempObjeto = objeto;
    if (opcion != 2) {
      this.datos.grupos.splice(index, 1);
      this.datos.grupos.unshift(tempObjeto);
      this.tabs.grupos.new = true;
    } else {
      this.datos.privados.splice(index, 1);
      this.datos.privados.unshift(tempObjeto);
      this.tabs.privados.new = true;
    }
  }

  tiene = (g: any, propiedad: string) => ChatDirective.contieneMensajes(g, propiedad);
}
