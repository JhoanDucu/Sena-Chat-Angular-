import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarDirective } from '../Directivas/editar.directive';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../Modelos/usuarios';

@Component({
  selector: 'app-perfil-editar',
  standalone: true,
  imports: [CommonModule, EditarDirective, FormsModule, ReactiveFormsModule],
  templateUrl: './perfil-editar.component.html',
  styleUrl: './perfil-editar.component.css'
})
export class PerfilEditarComponent {
  @Input() usuario: Usuario = {};
  hoverImg = false;
  cambios = false;
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
  formEditar = new FormGroup({
    correo: new FormControl('', Validators.required),
    primer_nom: new FormControl('', Validators.required),
    segundo_nom: new FormControl('', Validators.required),
    nombre_usuario: new FormControl('', Validators.required),
  });

  ngOnInit(){
    this.formEditar.patchValue({
      correo: this.usuario.correo,
      primer_nom: this.usuario.primer_nom,
      segundo_nom: this.usuario.segundo_nom,
      nombre_usuario: this.usuario.nombre_usuario
    });
  }

  activarBoton = () => this.hoverImg = !this.hoverImg;

  activarEditar = (prop: any) => {
    for (const key in this.propsEditar) key === prop ? 
    this.propsEditar[prop] = true : this.propsEditar[key] = false;
  };

  generarCambios(prop: 'correo' | 'primer_nom' | 'segundo_nom' | 'nombre_usuario'){
    this.usuario[prop] = this.formEditar.value[prop] as string;
    // if (this.formEditar.value[prop] != this.usuario[prop])
    // this.formEditar.patchValue({})
  }

  editar(){

  }
}