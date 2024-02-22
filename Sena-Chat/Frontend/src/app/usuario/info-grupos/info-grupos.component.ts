import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SesionService } from '../Sesiones/sesion.service';
import { Usuario } from '../Modelos/usuarios';
import { ChatService } from '../Servicios/chat.service';
import { Grupo } from '../Modelos/grupos';
import { BootstrapService } from '../Servicios/bootstrap.service';
import { InfoPerfilComponent } from '../info-perfil/info-perfil.component';
import { InfoAgregarComponent } from '../info-agregar/info-agregar.component';
import { InfoEliminarComponent } from '../info-eliminar/info-eliminar.component';

@Component({
  selector: 'app-info-grupos',
  standalone: true,
  imports: [CommonModule, InfoPerfilComponent, InfoAgregarComponent, InfoEliminarComponent],
  templateUrl: './info-grupos.component.html',
  styleUrl: './info-grupos.component.css'
})
export class InfoGruposComponent {
  constructor(
    protected Sesion: SesionService,
    private Chat: ChatService,
    private B: BootstrapService
  ) { }
  id: string = '';
  miembros: Usuario[] = [];
  usuario = this.Sesion.get('documento');
  @Input() grupoSeleccionado: Grupo = {};
  mostrarDropdown: string | undefined = undefined;
  usuarioConsultado: any;

  ngOnInit() { this.B.iniciarInstanciasInfo(); }

  abrirInformacion = () => this.grupoSeleccionado.fk_tipo_grupo == 2 ? this.consultarMiembros() : this.consultarPerfil(1131104356);

  consultarMiembros() {
    this.Chat.traerMiembros(this.grupoSeleccionado.id_grupos).subscribe((data: any) => {
      this.miembros = data;
      this.B.infoCanva();
    });
  }

  hover = (element: any) => {
    this.mostrarDropdown = element;
    this.id = 'dropdown';
  }

  notHover = () => {
    this.mostrarDropdown = undefined;
    this.id = '';
  }

  abrirDrop = (event: Event) => {
    event.stopPropagation();
    this.B.drop();
  };

  cerrar = () => this.B.infoCanvaCerrar();

  abrirAgregar = () => { this.cerrar(); this.B.agregarCanva(); }

  consultarPerfil = (numerodoc: any) => { 
    this.cerrar();
    this.Chat.traerUsuario(numerodoc).subscribe((data: Usuario) => {
      this.usuarioConsultado = data;
      this.B.perfilCanva(); 
    });
  }

}
