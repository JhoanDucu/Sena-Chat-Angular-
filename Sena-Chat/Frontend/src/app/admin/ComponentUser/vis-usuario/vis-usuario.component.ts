import { Component } from '@angular/core';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';
import { UsuarioService } from '../../service/usuario.service';

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

  constructor(private visUsuario:UsuarioService) { }

  mostrar = false;
  usuarios:any = [];

  mostrarCrear = () => this.mostrar = !this.mostrar;

  ngOnInit() {
    this.visUsuario.traerUsuarios().subscribe((datos:any) => {
      this.usuarios = datos;
    });
  }

}
