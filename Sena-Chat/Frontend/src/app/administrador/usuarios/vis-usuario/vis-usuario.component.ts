import { Component, EventEmitter, Output } from '@angular/core';
import { UsuariosService } from '../../Servicios/usuarios.service';
import { Usuario } from '../../../Modelos/usuarios';

@Component({
  selector: 'app-vis-usuario',
  standalone: true,
  imports: [],
  templateUrl: './vis-usuario.component.html',
  styleUrl: './vis-usuario.component.css'
})
export class VisUsuarioComponent {
  constructor (private servicio: UsuariosService) {}
  @Output() mostrar = new EventEmitter();
  usuarios: Usuario[] = [];
  
  ngOnInit(){
    this.servicio.traerUsuarios().subscribe((data: any) => this.usuarios = data);
  }
}
