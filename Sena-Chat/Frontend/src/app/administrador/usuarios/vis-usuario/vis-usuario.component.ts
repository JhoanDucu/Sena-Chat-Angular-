import { Component } from '@angular/core';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';
import { UsuariosService } from '../../Servicios/usuarios.service';
import { Usuario } from '../../Modelos/usuarios';

@Component({
  selector: 'app-vis-usuario',
  standalone: true,
  imports: [
    CrearUsuarioComponent,
  ],
  templateUrl: './vis-usuario.component.html',
  styleUrl: './vis-usuario.component.css'
})
export class VisUsuarioComponent {
  constructor (private servicio: UsuariosService) {}
  usuarios: Usuario[] = [];
  mostrar = false;
  mostrarCrear = () => this.mostrar = !this.mostrar;
  ngOnInit(){
    this.servicio.traerUsuarios().subscribe((data: any) => this.usuarios = data);
  }
}
