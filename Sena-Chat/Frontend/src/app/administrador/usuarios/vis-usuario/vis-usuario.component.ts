import { Component, EventEmitter, Output } from '@angular/core';
import { UsuariosService } from '../../Servicios/usuarios.service';
import { Usuario } from '../../../Modelos/usuarios';
import { urlImagenes } from '../../../../servidor';
import { BootstrapService } from '../../Servicios/bootstrap.service';

@Component({
  selector: 'app-vis-usuario',
  standalone: true,
  imports: [],
  templateUrl: './vis-usuario.component.html',
  styleUrl: './vis-usuario.component.css'
})
export class VisUsuarioComponent {
  constructor (private servicio: UsuariosService, private b: BootstrapService) {}
  @Output() mostrar = new EventEmitter();
  usuarios: Usuario[] = [];
  url = urlImagenes;
  
  ngOnInit(){
    this.servicio.traerUsuarios().subscribe((data: any) => this.usuarios = data);
  }

  abrirInfo = (usuario: any) => {
    this.b.infoUsuarios();
    this.mostrar.emit(['usuarios', undefined, usuario]);
  }

}