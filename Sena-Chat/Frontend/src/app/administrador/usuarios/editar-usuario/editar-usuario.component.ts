import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../Servicios/usuarios.service';
import { Usuario } from '../../../Modelos/usuarios';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
    correo: new FormControl('', [Validators.required, Validators.email]),
    primer_nom: new FormControl('', Validators.required),
    segundo_nom: new FormControl('', Validators.required),
    primer_apellido: new FormControl('', Validators.required),
    segundo_apellido: new FormControl('', Validators.required),
    nombre_usuario: new FormControl('', Validators.required),
    numerodoc: new FormControl('', Validators.required),
    fk_id_rol: new FormControl('', Validators.required),
    fk_id_tipodoc: new FormControl('', Validators.required),
    id_fichas: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.servicio.traerUsuarioPorId(this.numerodoc).subscribe(data => {
      this.usuario = data;
      this.formUsuario.setValue({
        correo: this.usuario.correo as string,
        primer_nom: this.usuario.primer_nom as string,
        segundo_nom: this.usuario.segundo_nom as string,
        primer_apellido: this.usuario.primer_apellido as string,
        segundo_apellido: this.usuario.segundo_apellido as string,
        nombre_usuario: this.usuario.nombre_usuario as string,
        numerodoc: this.usuario.numerodoc as string,
        fk_id_rol: this.usuario.fk_id_rol as string,
        fk_id_tipodoc: this.usuario.fk_id_tipodoc as string,
        id_fichas: this.usuario.id_fichas as string,
      });
    });
    this.servicio.traerIdFichas().subscribe((data: any) => this.fichas = data);
  }

  cancelar = () => this.volver.emit();

  validar() {
    this.editar(this.formUsuario.value, this.numerodoc);
  }

  editar(datos: any, numdoc: any) {
    this.servicio.editarUsuario(datos, numdoc).subscribe((data) => { if (data) this.cancelar(); });
  }
}