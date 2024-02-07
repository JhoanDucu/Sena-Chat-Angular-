import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario } from '../Modelos/usuarios';
import { EditarDirective } from '../Directivas/editar.directive';

@Component({
  selector: 'app-perfil-editar',
  standalone: true,
  imports: [CommonModule, EditarDirective],
  templateUrl: './perfil-editar.component.html',
  styleUrl: './perfil-editar.component.css'
})
export class PerfilEditarComponent {
  @Input() usuario: Usuario = {};
  hoverImg = false;
  propsEditar: any = {
    correo: false,
    nombres: false,
    apellidos: false,
    contrasena: false,
    nombre_usuario: false,
    descripcion: false,
    numerodoc: false,
    fk_id_tipodoc: false,
    id_fichas: false,
    foto: false,
    fk_id_rol: false
  };

  activarBoton = () => this.hoverImg = !this.hoverImg;

  activarEditar = (prop: any) => this.propsEditar[prop] = !this.propsEditar[prop];
}