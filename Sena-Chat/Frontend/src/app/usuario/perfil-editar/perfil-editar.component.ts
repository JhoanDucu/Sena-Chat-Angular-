import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarDirective } from '../Directivas/editar.directive';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../Modelos/usuarios';
import { ConfigurarService } from '../Servicios/configurar.service';
import { BootstrapService } from '../Servicios/bootstrap.service';
import { Fecha } from '../../Modelos/fechas';
import { urlImagenes } from '../../../servidor';

@Component({
  selector: 'app-perfil-editar',
  standalone: true,
  imports: [CommonModule, EditarDirective, FormsModule, ReactiveFormsModule],
  templateUrl: './perfil-editar.component.html',
  styleUrl: './perfil-editar.component.css'
})
export class PerfilEditarComponent {
  constructor(
    private Configurar: ConfigurarService,
    private b: BootstrapService
  ) { }
  @Input() usuario: Usuario = {};
  @Output() actualizar = new EventEmitter();
  hoverImg = false;
  cambios = false;
  propsEditar: any = {
    correo: false,
    primer_nom: false,
    segundo_nom: false,
    primer_apellido: false,
    segundo_apellido: false,
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
  url = urlImagenes;
  fotoPerfil: any;
  fotoSeleccionada: any;

  ngOnInit() {
    this.cancelar();
  }

  activarBoton = () => this.hoverImg = !this.hoverImg;

  activarEditar = (prop: string, prop2?: string) => {
    for (const key in this.propsEditar) {
      if (prop == key) this.propsEditar[prop] = true; else this.propsEditar[key] = false;
      prop2 ? this.propsEditar[prop2] = true : null;
    }
  };

  generarCambios(prop: keyof Usuario) {
    this.formEditar.patchValue({ [prop]: this.formEditar.value[prop] });
    for (const key in this.formEditar.value) {
      this.cambios = this.comprobarCambios(key as keyof Usuario);
      if (this.cambios) break;
    }
    this.propsEditar[prop] = false;
  }

  comprobarCambios = (prop: keyof Usuario) => this.usuario[prop] != this.formEditar.value[prop];

  validar() {
    this.editar(this.formEditar.value, this.usuario.numerodoc);
  }

  editar(datos: any, numdoc: any) {
    const formData = new FormData();
    formData.append('file', this.fotoSeleccionada);
    this.Configurar.subirImagen(formData).subscribe((data) => {
      if (data !== 'No hay archivos')
        datos.foto = data;
      this.Configurar.actualizarUsuario(datos, numdoc).subscribe((data: any) => {
        if (data == 'Actualizado') {
          this.b.toastPerfil();
          this.actualizar.emit(this.formEditar.value);
        } else alert('No actualizado');
        this.cambios = false;
      });
    });
  }

  cambiarPerfil(event: any) {
    this.fotoSeleccionada = event.files[0];
    this.convertFile(event.files[0]).then((image: any) => this.fotoPerfil = 'url(' + image + ')');
    this.cambios = true;
  }

  convertFile = async (file: File) => new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => { resolve(reader.result) };
    } catch (error) { console.error(error); }
  });

  cancelar() {
    this.cambios = false;
    this.formEditar.patchValue({
      correo: this.usuario.correo,
      primer_nom: this.usuario.primer_nom,
      segundo_nom: this.usuario.segundo_nom,
      nombre_usuario: this.usuario.nombre_usuario,
      primer_apellido: this.usuario.primer_apellido,
      segundo_apellido: this.usuario.segundo_apellido,
      contrasena: this.usuario.contrasena,
      descripcion: this.usuario.descripcion,
      numerodoc: this.usuario.numerodoc,
      fk_id_tipodoc: this.usuario.fk_id_tipodoc as string,
      id_fichas: this.usuario.id_fichas,
      foto: '',
      fk_id_rol: this.usuario.fk_id_rol,
    });
    this.fotoPerfil = `url('${this.url}${this.usuario.foto}')`;
  }

  fecha = () => Fecha.momentoAhora();

  hora = () => Fecha.horaActual();
}