import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../Servicios/usuarios.service';
import { Ficha } from '../../../Modelos/fichas';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent {
  constructor (private servicio: UsuariosService) { }
  @Output() volver = new EventEmitter();
  fichas: Ficha[] = [];
  formRegistro = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email]),
    primer_nom: new FormControl('', Validators.required),
    segundo_nom: new FormControl('', Validators.required),
    primer_apellido: new FormControl('', Validators.required),
    segundo_apellido: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required),
    nombre_usuario: new FormControl('', Validators.required),
    numerodoc: new FormControl('', Validators.required),
    fk_id_rol: new FormControl('', Validators.required),
    fk_id_tipodoc: new FormControl('', Validators.required),
    // confirmar: new FormControl('', Validators.required),
    id_fichas: new FormControl('', Validators.required)
  });

  ngOnInit(){
    this.servicio.traerIdFichas().subscribe((data: any) => this.fichas = data);
  }

  cancelar = () => this.volver.emit();

  validar(){
    this.nuevoUsuario();
  }

  nuevoUsuario(){
    this.servicio.agregarUsuario(this.formRegistro.value).subscribe((data) => this.cancelar() );
  }

}
