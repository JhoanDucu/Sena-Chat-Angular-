import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SesionService } from '../Sesiones/sesion.service';
import { Usuario } from '../Modelos/usuarios';
import { ChatService } from '../Servicios/chat.service';
import { Dropdown, Offcanvas } from 'bootstrap';
import { Grupo } from '../Modelos/grupos';

@Component({
  selector: 'app-info-grupos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-grupos.component.html',
  styleUrl: './info-grupos.component.css'
})
export class InfoGruposComponent {
  constructor(
    protected Sesion: SesionService,
    private Chat: ChatService
  ) { }
  offcanvas: Offcanvas | undefined = undefined;
  dropdown: Dropdown | undefined = undefined;
  id: string  = '';
  miembros: Usuario[] = [];
  usuario = this.Sesion.get('documento');
  @Input() grupoSeleccionado: Grupo | any;
  mostrarDropdown: string | undefined = undefined;

  ngOnInit(){
    this.offcanvas = new Offcanvas(document.getElementById('offcanvasNavbar') as HTMLElement);
  }

  consultarMiembros() {
    this.Chat.traerMiembros(this.grupoSeleccionado.id_grupos).subscribe((data: any) => { this.miembros = data });
    this.offcanvas?.show();
  }

  hover = (element: any) => {
    this.mostrarDropdown = element;
    this.id = 'dropdown';
  }
  notHover = () => {
    this.mostrarDropdown = undefined;
    this.id = '';
  }

  abrir(){
    this.dropdown = new Dropdown(document.getElementById('dropdown') as HTMLElement);
    this.dropdown.show();
  }

  cerrarOff(){
    this.offcanvas?.hide();
  } 
}
