import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
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
  @Input() confirmar: any;
  usuarios: Usuario[] = [];
  url = urlImagenes;
  numBorrar: any;
  index: any;
  
  ngOnInit(){
    this.servicio.traerUsuarios().subscribe((data: any) => this.usuarios = data);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['confirmar'].firstChange) 
    this.servicio.eliminarUsuario(this.numBorrar).subscribe((data) => {
      if(data === 'Usuario eliminado correctamente') this.usuarios.splice(this.index, 1);
      this.abrirModal();
    });
  }

  abrirInfo = (usuario: any) => {
    this.b.infoUsuarios();
    this.mostrar.emit(['usuarios', undefined, usuario]);
  }

  abrirModal(numdoc?: any, index?: any){
    this.numBorrar = numdoc ? numdoc : undefined;
    this.index = index ? index : undefined;
    this.b.modal();
  }

}