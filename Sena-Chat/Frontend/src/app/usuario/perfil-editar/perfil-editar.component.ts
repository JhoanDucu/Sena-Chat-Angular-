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
    primer_nom: false,
    segundo_nom: false,
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
    primer_apellido: new FormControl('', Validators.required),
    segundo_apellido: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    numerodoc: new FormControl('', Validators.required),
    fk_id_tipodoc: new FormControl('', Validators.required),
    id_fichas: new FormControl('', Validators.required),
    foto: new FormControl('', Validators.required),
    fk_id_rol: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.cancelar();
  }

  activarBoton = () => this.hoverImg = !this.hoverImg;

  activarEditar = (prop: string, prop2?: string) => {
    for (const key in this.propsEditar){ 
      if (prop == key) this.propsEditar[prop] = true; else this.propsEditar[key] = false;
      prop2 ? this.propsEditar[prop2] = true : null;
    }
  };

  generarCambios(prop: keyof Usuario) {
    this.formEditar.patchValue({ [prop]: this.formEditar.value[prop] });
    this.propsEditar[prop] = false;
    console.log(this.propsEditar);
    this.cambios = this.formEditar.value[prop] != this.usuario[prop] ? true : false;
  }

  editar() {

  }

  cancelar() {
    this.cambios = false;
    this.formEditar.patchValue({
      correo: this.usuario.correo,
      primer_nom: this.usuario.primer_nom,
      segundo_nom: this.usuario.segundo_nom,
      nombre_usuario: this.usuario.nombre_usuario
    });
  }
}