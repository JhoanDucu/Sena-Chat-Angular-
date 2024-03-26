import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../Servicios/usuarios.service';
import { Usuario } from '../../../Modelos/usuarios';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ficha } from '../../../Modelos/fichas';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent {
  constructor(private servicio: UsuariosService) { }
  @Input() numerodoc: any;
  @Output() volver = new EventEmitter();
  usuario: Usuario = {};
  fichas: Ficha[] = [];
  formUsuario = new FormGroup({

  });

  ngOnInit() {
    this.servicio.traerUsuarioPorId(this.numerodoc).subscribe(data => {
      this.usuario = data;
      // this.formGrupo.setValue({
      //   nom_grupos: this.grupo.nom_grupos as string,
      //   descripcion_grupos: this.grupo.descripcion_grupos as string,
      //   id_ficha: this.grupo.id_ficha as string
      // })
    });
    this.servicio.traerIdFichas().subscribe((data: any) => this.fichas = data);
  }

  cancelar = () => this.volver.emit();

  validar(){
    this.editar(this.formUsuario.value, this.numerodoc);
  }

  editar(datos: any, numdoc: any){
    this.servicio.editarUsuario(datos, numdoc).subscribe();
  }
}