import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../Servicios/usuarios.service';
import { Usuario } from '../../../Modelos/usuarios';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent {
  constructor(private servicio: UsuariosService) { }
  @Input() numerodoc: any;
  @Output() volver = new EventEmitter();
  usuario: Usuario = {};

  ngOnInit() {
    this.servicio.traerUsuarioPorId(this.numerodoc).subscribe(data => {
      this.usuario = data;
      // this.formGrupo.setValue({
      //   nom_grupos: this.grupo.nom_grupos as string,
      //   descripcion_grupos: this.grupo.descripcion_grupos as string,
      //   id_ficha: this.grupo.id_ficha as string
      // })
    });
    // this.servicio.traerIdFichas().subscribe((data: any) => this.fichas = data);
  }

  cancelar = () => this.volver.emit();

  validar(){
    // this.editar(this.formGrupo.value);
  }

  editar(datos: any){
    this.servicio
  }
}
